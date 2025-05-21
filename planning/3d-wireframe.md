so the amount of squares is growing by increasing in 8 (ignoring the first one which is technically zero since is not a full group of blocks)

f: 1, 8(+7), 16(+8), 24(+8)
f(x): [0] , [1,0,-1,-1,-1,0,1,1]
f(y): [0] , [1,1,1,0,-1,-1,-1,0]

// center block
i:0, x:0, y:0

// second layer of blocks
i:1, x:1, y:1
i:2, x:0, y:1
i:3, x:-1, y:1
i:4, x:-1, y:0
i:5, x:-1, y:-1
i:6, x:0, y:-1
i:7, x:1, y:-1
i:8, x:1, y:0

// third layer of blocks
i:9, x:2, y:2