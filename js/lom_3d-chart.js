import './modules/index.js'
import { getPrefix } from './helpers.js'
import * as THREE from './modules/three.module.min.js'
import { OrbitControls } from './modules/OrbitControls.js'
import { servers } from './db_merges.js'
import { t } from './translations.js'

import './component_navbar.js'
import { langs } from './component_filters.js'

const rad = Math.PI / 180

customElements.define(
  getPrefix('3d-chart'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = {
      attrs: [],
      winHeight: undefined,
      winWidth: undefined,
      camera: undefined,
      scene: undefined,
      renderer: undefined,
      gridHelper: undefined,
      gridToggle: true,

      language: 'all',
      langs,

      minPolarAngle: 0,
      maxPolarAngle: 120 * rad,
      minDistance: 120,
      maxDistance: 500,
      servers: servers.sort((a, b) => b.values.length - a.values.length),
      controls: undefined,

      mouse: new THREE.Vector2(),
      raycaster: new THREE.Raycaster(),
      hovered: null,
      originalMaterials: new Map(),

      // Predefined HEX colors
      scolorHex: {
        amen: '#713030',
        es: '#9e8b2e',
        espt: '#478547',
        pt: '#2e9e79',
        euen: '#2e669e',
        mush: '#2e539e',
        de: '#2e2e9e',
        fr: '#412e9e',
        me: '#662e9e',
        tr: '#792e9e',
        ru: '#8a2859',

        cn: '#9d4b3b',
        vn: '#9e662e',
        id: '#8b9e2e',
        en: '#669e2e',
        th: '#2e8b9e',

        kr: '#9f399f',
        jp: '#9e2e66',
        tw: '#9e2e2e',
      },

      template: `
        <style>
          .tooltip-3d {
            position: absolute;
            padding: 4px 8px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 4px;
            pointer-events: none;
            font-size: 12px;
            display: none;
            z-index: 100;
          }
        </style>

        <div class="nav-controls">
          <lom-navbar></lom-navbar>
          <lom-filters></lom-filters>
        </div>

        <div class="controls">
          <button id="grid" role="button" class="btn shamrock" data-color="hsl(149deg, 61%, 51%)">
            Toggle Grid
          </button>
        </div>
        <div id="tree"></div>

        <div class="tooltip-3d"></div>
      `,
    }

    #getXY(i) {
      if (i === 0) return { x: 0, y: 0 }

      let layer = 1
      let legLen = 1
      let steps = 0
      let x = 0
      let y = 0
      let dx = 1
      let dy = 0

      for (let step = 1; step <= i; step++) {
        x += dx
        y += dy
        steps++

        if (steps === legLen) {
          // Rotate direction
          const temp = dx
          dx = -dy
          dy = temp
          layer++

          // Every two turns, increase leg length
          if (dy === 0) legLen++
          steps = 0
        }
      }

      return { x, y }
    }

    #createGuides() {
      this.#data.gridHelper = new THREE.GridHelper(200, 25)
      this.#data.scene.add(this.#data.gridHelper)
    }

    #handleHover(clientX, clientY) {
      this.#data.raycaster.setFromCamera(this.#data.mouse, this.#data.camera)
      const intersects = this.#data.raycaster.intersectObjects(
        this.#data.scene.children,
        true // important to hit meshes inside groups
      )

      const tooltip = document.querySelector('.tooltip-3d')

      if (intersects.length > 0) {
        const intersect = intersects[0].object
        if (intersect.name === 'cubo') {
          const rect = this.#data.renderer.domElement.getBoundingClientRect()

          tooltip.style.display = 'block'
          tooltip.textContent = intersect.userData.label || 'Cube'

          // Adjust position relative to canvas, not window
          tooltip.style.left = `${clientX}px`
          tooltip.style.top = `${clientY - 30}px`
        } else {
          tooltip.style.display = 'none'
        }
      } else {
        tooltip.style.display = 'none'
      }
    }

    #createCubes() {
      let localServers

      if (this.#data.language !== 'all') {
        localServers = this.#data.servers.filter(
          server =>
            server.key.id === this.#data.language ||
            server.values.some(val => val.id === this.#data.language)
        )
      } else if (this.#data.filters) {
        localServers = this.#data.servers.filter(server =>
          this.#data.filters.includes(server.key.label)
        )
      } else {
        localServers = this.#data.servers
      }

      const geometry = new THREE.BoxGeometry(1, 0.5, 1)
      const gap = 8

      this.#data.serverGroups = new Map()

      localServers.forEach(({ key, values }, ringIndex) => {
        const group = new THREE.Group()
        const { x, y: z } = this.#getXY(ringIndex) // spiral on X-Z

        values.forEach(({ id }, stackIndex) => {
          const material = this.#data.scolorHex?.[id]
            ? new THREE.MeshBasicMaterial({ color: this.#data.scolorHex?.[id] })
            : new THREE.MeshBasicMaterial({ color: '#ffffff' })

          const mesh = new THREE.Mesh(geometry, material)
          const y = stackIndex + 0.05
          mesh.position.set(x * gap, y * 0.55, z * gap)
          mesh.name = 'cubo'
          mesh.userData = {
            label: `${key.label} / ${values.length} ${t('Servers')}`,
            serverKey: key.label, // important to identify group
          }

          group.add(mesh)
        })

        this.#data.scene.add(group)
        this.#data.serverGroups.set(key.label, group)
      })
    }

    #checkHover() {
      const {
        raycaster,
        camera,
        scene,
        mouse,
        hovered,
        originalMaterials,
        serverGroups,
      } = this.#data

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        const first = intersects[0].object

        if (first.name === 'cubo') {
          const serverKey = first.userData.serverKey
          const group = serverGroups.get(serverKey)

          if (group !== hovered) {
            // Reset previous group colors
            if (hovered) {
              hovered.children.forEach(mesh => {
                mesh.material.color.set(originalMaterials.get(mesh))
              })
            }

            // Save and set white for new group
            group.children.forEach(mesh => {
              if (!originalMaterials.has(mesh)) {
                originalMaterials.set(mesh, mesh.material.color.getHex())
              }
              mesh.material.color.set(0xffffff)
            })

            this.#data.hovered = group
          }
        }
      } else if (hovered) {
        hovered.children.forEach(mesh => {
          mesh.material.color.set(originalMaterials.get(mesh))
        })
        this.#data.hovered = null
      }

      this.#renderScene()
    }

    #clearTree() {
      this.#data.scene = new THREE.Scene()
    }

    #onToggleGrid() {
      this.#data.gridToggle = !this.#data.gridToggle
      this.#data.gridToggle
        ? this.#data.scene.add(this.#data.gridHelper)
        : this.#data.scene.remove(this.#data.gridHelper)
      this.#renderScene()
    }

    #onHoverObjects() {
      const rect = this.#data.renderer.domElement.getBoundingClientRect()
      this.#data.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      this.#data.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      this.#checkHover()
      this.#handleHover(event.clientX, event.clientY)
    }

    #generateListeners() {
      const filterContainer = this.querySelector('.filters')
      if (!filterContainer) return

      filterContainer.addEventListener('click', e => {
        const button = e.target.closest('button')
        if (!button || !filterContainer.contains(button)) return

        const lang = button.classList[0]
        this.#data.language = lang

        this.querySelectorAll('.filters button').forEach(btn =>
          btn.classList.remove('active')
        )
        button.classList.add('active')

        this.#clearTree()
        this.#createGuides()
        this.#createCubes()
        this.#renderScene()
      })

      this.querySelector('#grid').addEventListener('click', () =>
        this.#onToggleGrid()
      )

      this.#data.controls.addEventListener('change', () => this.#renderScene())

      window.addEventListener('resize', () => this.#resizeWindow())

      this.querySelector('#tree').addEventListener('mousemove', event =>
        this.#onHoverObjects()
      )
    }

    #renderScene() {
      this.#data.renderer.render(this.#data.scene, this.#data.camera)
    }

    connectedCallback() {
      this.innerHTML = this.#data.template

      this.#data.camera = new THREE.PerspectiveCamera(
        20, // FOV
        this.#data.winWidth / this.#data.winHeight,
        0.1,
        1000
      )
      this.#data.camera.position.set(200, 200, 400)
      this.#data.camera.lookAt(0, 0, 0) // Look at the center of the scene

      this.#data.scene = new THREE.Scene()

      this.#createGuides()
      this.#createCubes()

      this.#data.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
      this.#resizeWindow()
      this.querySelector('#tree').appendChild(this.#data.renderer.domElement)

      this.#data.controls = new OrbitControls(
        this.#data.camera,
        this.#data.renderer.domElement
      )

      this.#data.controls.minPolarAngle = this.#data.minPolarAngle
      this.#data.controls.maxPolarAngle = this.#data.maxPolarAngle

      this.#data.controls.minDistance = this.#data.minDistance
      this.#data.controls.maxDistance = this.#data.maxDistance

      this.#renderScene()

      this.#generateListeners()
    }

    #resizeWindow() {
      this.#data.winWidth = window.innerWidth
      this.#data.winHeight = window.innerHeight
      this.#data.renderer.setSize(this.#data.winWidth, this.#data.winHeight)
      this.#data.camera.aspect = this.#data.winWidth / this.#data.winHeight
      this.#data.camera.updateProjectionMatrix()
    }
  }
)
