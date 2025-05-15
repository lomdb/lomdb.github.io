const params = new URLSearchParams(window.location.search)
const locale = params.get('lang') || 'en'

const en = {
  'Merged Servers': 'Merged Servers',
  "Leading Server": "Leading Server",
  "Merged": "Merged",
  "Empty": "Empty",
  "Size": "Size",

  "DB State": "DB State",
  "Region": "Region",
  "Merges": "Merges",
  "Top 100": "Top 100",
  "Elites": "Elites",
  'The Americas': 'The Americas',
  'Europe': 'Europe',
  'South East Asian (SEA)': 'South East Asian (SEA)',
  'Taiwan': 'Taiwan',
  'Korea':'Korea',
  'Japan': 'Japan',
  'China': 'China',
  '(Adding players on request)': '(Adding players on request)',

  "Players": "Players",
  "Server": "Server",
  "UID": "UID",
  "Nick": "Nick",
  "Rank": "Rank",
  "Position": "Position",
  "Date": "Date",
  "top": "top",
  "elite": "elite",
  "creator": "creator",
  "detective": "detective",
  "vmod": "vmod",
  "master": "master",
  'lv': 'lv',

  "Old Entry": "Old Entry",
  "Verified": "Verified",
  "month": "month",
  "months": "months",
  "ago": "ago",
  "Highest rank and position achieved": "Highest rank and position achieved",

  "Home": "Home",
  "Timeline": "Timeline",
  'Merge\'s Gaps': 'Merge\'s Gaps',
  "DB State": "DB State",

  "timelineDescription": `A comprehensive and intuitive visual overview of all server merges that have occurred in Legend of Mushrooms. This timeline consolidates every known merge event into a single, easy-to-navigate table. Each entry includes details like merge date, servers involved, and regional context—helping users track the evolution of the server landscape at a glance.`,
  "Check Timeline": "Check Timeline",
  "Players Leaderboard": "Players Leaderboard",
  "leaderboardDescription": `A focused list of players tracked in the project’s dedicated player database. This leaderboard contributes additional context to both the Timeline and Merges View. It highlights selected players across servers, enabling further insights into server populations or notable player movements over time.`,
  "Check Players Board": "Check Players Board",
  "mergesDescription": `A detailed table displaying the same merge information as the public spreadsheet, enhanced with language filters to tailor the view by region or localization. This view is especially useful for cross-referencing and double-checking data between the internal project database and the shared community spreadsheet. Ideal for those who want a deeper, verified look at the data source.`,
  "gapDescription": `A diagnostic view designed to identify servers that have never appeared in any known merge throughout the game's history. This tool scans for gaps in the merge timeline, helping to surface unmerged servers, data inconsistencies, or potential oversights in the merge records.`,
  'Check Merge\'s Gaps': 'Check Merge\'s Gaps',
  "stateDescription": `This section shows the most recent date on which data was added to each part of the database. It helps track activity across different regions or server groups by highlighting the last known update for each. Use it to quickly assess which sections are current and which haven't received new input recently.`,
  "Check The State": "Check The State",

  "instructions": `<p>If you believe your user should be listed here or that any data needs correction, feel free to send an email to <a href="mailto:lomdb.zhtzh@simplelogin.fr">lomdb.zhtzh@simplelogin.fr</a> with the following:</p>
  <ul>
    <li>
      A screenshot of your user profile, ideally showing your original
      server.
    </li>
    <li>
      Screenshots showing your presence in the Elite Champion or above.
    </li>
    <li>The date when you were ranked in one of these tiers.</li>
  </ul>
  `
}

const es = {
  'Merged Servers': 'Servidores fusionados',
  "Leading Server": "Servidor principal",
  "Merged": "Fusionado",
  "Empty": "Vacío",
  "Size": "Tamaño",

  "DB State": "Estado de la BD",
  "Region": "Región",
  "Merges": "Fusiones",
  "Top 100": "Top 100",
  "Elites": "Élite",
  'The Americas': 'América',
  'Europe': 'Europa',
  'South East Asian (SEA)': 'Sudeste Asiático (SEA)',
  'Taiwan': 'Taiwán',
  'Korea':'Corea',
  'Japan': 'Japón',
  'China': 'China',
  '(Adding players on request)': '(Agregando jugadores a pedido)',

  "Players": "Jugadores",
  "Server": "Servidor",
  "UID": "UID",
  "Nick": "Apodo",
  "Rank": "Rango",
  "Position": "Posición",
  "Date": "Fecha",
  "top": "top",
  "elite": "élite",
  "creator": "creador",
  "detective": "detective",
  "vmod": "vmod",
  "master": "maestro",
  'lv': 'nv',

  "Old Entry": "Entrada antigua",
  "Verified": "Verificado",
  "month": "mes",
  "months": "meses",
  "ago": "atrás",
  "Highest rank and position achieved": "Rango y posición más altos alcanzados",

  "Home": "Inicio",
  "Timeline": "Línea de tiempo",
  'Merge\'s Gaps': 'Huecos de fusiones',
  "DB State": "Estado de la BD",

  "timelineDescription": `Una visión visual completa e intuitiva de todas las fusiones de servidores que han ocurrido en Legend of Mushrooms. Esta línea de tiempo consolida cada evento conocido en una tabla fácil de navegar. Cada entrada incluye detalles como la fecha de fusión, los servidores involucrados y el contexto regional, ayudando a los usuarios a seguir la evolución del panorama de servidores de un vistazo.`,
  "Check Timeline": "Ver línea de tiempo",
  "Players Leaderboard": "Clasificación de jugadores",
  "leaderboardDescription": `Una lista focalizada de jugadores rastreados en la base de datos de jugadores del proyecto. Esta clasificación aporta contexto adicional tanto a la línea de tiempo como a la vista de fusiones. Destaca jugadores seleccionados en diferentes servidores, permitiendo más información sobre poblaciones o movimientos notables de jugadores a lo largo del tiempo.`,
  "Check Players Board": "Ver clasificación de jugadores",
  "Check Merges": "Ver fusiones",
  "mergesDescription": `Una tabla detallada que muestra la misma información de fusiones que la hoja de cálculo pública, mejorada con filtros de idioma para personalizar la vista por región o localización. Esta vista es especialmente útil para cotejar y verificar datos entre la base de datos interna del proyecto y la hoja de la comunidad. Ideal para quienes buscan una visión más profunda y verificada de la fuente de datos.`,
  "gapDescription": `Una vista de diagnóstico diseñada para identificar servidores que nunca han aparecido en ninguna fusión conocida a lo largo de la historia del juego. Esta herramienta escanea los huecos en la línea de tiempo de fusiones, ayudando a detectar servidores no fusionados, inconsistencias de datos o posibles omisiones en los registros.`,
  'Check Merge\'s Gaps': 'Ver huecos de fusiones',
  "stateDescription": `Esta sección muestra la fecha más reciente en la que se agregó información a cada parte de la base de datos. Ayuda a seguir la actividad en diferentes regiones o grupos de servidores destacando la última actualización conocida. Úsala para evaluar rápidamente qué secciones están actualizadas y cuáles no han recibido nuevos datos recientemente.`,
  "Check The State": "Ver estado",

  "instructions": `<p>Si crees que tu usuario debería estar listado aquí o que algún dato debe corregirse, no dudes en enviar un correo a <a href="mailto:lomdb.zhtzh@simplelogin.fr">lomdb.zhtzh@simplelogin.fr</a> con lo siguiente:</p>
  <ul>
    <li>
      Una captura de pantalla de tu perfil de usuario, idealmente mostrando tu servidor original.
    </li>
    <li>
      Capturas que muestren tu presencia en el rango Reyes de los Cien o superior.
    </li>
    <li>La fecha en que alcanzaste uno de esos rangos.</li>
  </ul>
  `
}

const pt = {
  'Merged Servers': 'Servidores fundidos',
  "Leading Server": "Servidor principal",
  "Merged": "Fundido",
  "Empty": "Vazio",
  "Size": "Tamanho",

  "DB State": "Estado do BD",
  "Region": "Região",
  "Merges": "Fusões",
  "Top 100": "Top 100",
  "Elites": "Elites",
  'The Americas': 'Américas',
  'Europe': 'Europa',
  'South East Asian (SEA)': 'Sudeste Asiático (SEA)',
  'Taiwan': 'Taiwan',
  'Korea': 'Coreia',
  'Japan': 'Japão',
  'China': 'China',
  '(Adding players on request)': '(Adicionando jogadores sob demanda)',

  "Players": "Jogadores",
  "Server": "Servidor",
  "UID": "UID",
  "Nick": "Apelido",
  "Rank": "Ranking",
  "Position": "Posição",
  "Date": "Data",
  "top": "top",
  "elite": "elite",
  "creator": "criador",
  "detective": "detetive",
  "vmod": "vmod",
  "master": "mestre",
  'lv': 'nv',

  "Old Entry": "Entrada antiga",
  "Verified": "Verificado",
  "month": "mês",
  "months": "meses",
  "ago": "atrás",
  "Highest rank and position achieved": "Maior ranking e posição alcançados",

  "Home": "Início",
  "Timeline": "Linha do tempo",
  'Merge\'s Gaps': 'Lacunas de fusões',
  "DB State": "Estado do BD",

  "timelineDescription": `Uma visão visual completa e intuitiva de todas as fusões de servidores que ocorreram no Legend of Mushrooms. Esta linha do tempo consolida cada evento conhecido em uma tabela fácil de navegar. Cada entrada inclui detalhes como data da fusão, servidores envolvidos e contexto regional, ajudando os usuários a acompanhar a evolução dos servidores rapidamente.`,
  "Check Timeline": "Ver linha do tempo",
  "Players Leaderboard": "Ranking de jogadores",
  "leaderboardDescription": `Uma lista focada de jogadores acompanhados no banco de dados dedicado do projeto. Este ranking fornece contexto adicional tanto para a Linha do Tempo quanto para a visão de Fusões. Destaca jogadores selecionados em diferentes servidores, permitindo mais informações sobre populações ou movimentos notáveis ao longo do tempo.`,
  "Check Players Board": "Ver ranking de jogadores",
  "Check Merges": "Ver fusões",
  "mergesDescription": `Uma tabela detalhada mostrando as mesmas informações de fusões da planilha pública, com filtros de idioma para personalizar a visualização por região ou localização. Essa visão é útil para comparar e verificar dados entre o banco de dados interno do projeto e a planilha da comunidade. Ideal para quem busca uma visão mais profunda e verificada da fonte.`,
  "gapDescription": `Uma visão diagnóstica projetada para identificar servidores que nunca apareceram em nenhuma fusão conhecida na história do jogo. Esta ferramenta analisa lacunas na linha do tempo de fusões, ajudando a detectar servidores não fundidos, inconsistências de dados ou omissões nos registros.`,
  'Check Merge\'s Gaps': 'Ver lacunas de fusões',
  "stateDescription": `Esta seção mostra a data mais recente em que dados foram adicionados a cada parte do banco de dados. Ajuda a acompanhar a atividade em diferentes regiões ou grupos de servidores, destacando a última atualização conhecida. Use para avaliar rapidamente quais seções estão atualizadas e quais não recebem novas entradas há algum tempo.`,
  "Check The State": "Ver estado",

  "instructions": `<p>Se você acredita que seu usuário deveria estar listado aqui ou que algum dado precisa de correção, envie um e-mail para <a href="mailto:lomdb.zhtzh@simplelogin.fr">lomdb.zhtzh@simplelogin.fr</a> com o seguinte:</p>
  <ul>
    <li>
      Uma captura de tela do seu perfil de usuário, de preferência mostrando o servidor original.
    </li>
    <li>
      Capturas mostrando sua presença no ranking Rei Lendario ou superior.
    </li>
    <li>A data em que você atingiu um desses rankings.</li>
  </ul>
  `
}

const fr = {
  'Merged Servers': 'Serveurs Fusionnés',
}

const de = {
  'Merged Servers': 'Zusammengeführte Server',
}

const dictionary = {
  en,
  es,
  pt,
  // fr,
  // de,
}

export function t(key, params = {}) {
  const raw = dictionary?.[locale]?.[key] || key;

  return raw.replace(/\{\{(\w+)\}\}/g, (_, param) => {
    return params[param] ?? `{{${param}}}`;
  });
}