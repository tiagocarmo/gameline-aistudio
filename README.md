
# GameLine

**Sua timeline de jogos pessoal.**

O **GameLine** é uma aplicação *frontend-only* desenvolvida para catalogar, acompanhar e visualizar a sua vida gamer ao longo dos anos. Diferente de redes sociais ou backlogs genéricos, o foco aqui é a **narrativa pessoal**, estatísticas visuais e uma experiência de uso elegante e fluida.

---

## 🚀 Tecnologias e Arquitetura

O projeto foi construído utilizando uma stack moderna, focada em performance e manutenibilidade, seguindo princípios de **Atomic Design**.

*   **Core:** React 18 (TypeScript)
*   **Estilização:** Tailwind CSS (com customização de paleta e fontes)
*   **Roteamento:** React Router DOM v6
*   **Gráficos:** Recharts
*   **Ícones:** Lucide React
*   **Build Tool:** Vite (implícito na estrutura de imports ES modules)
*   **Gerenciamento de Estado:** React Context API (`GameContext`)
*   **Persistência:** LocalStorage (Offline-first)

### Estrutura de Pastas (Atomic Design)

*   `components/atoms/`: Componentes indivisíveis (Botões, Badges, Inputs, Tipografia).
*   `components/molecules/`: Combinação de átomos (Cards de KPI, Campos de Busca, Empty States).
*   `components/organisms/`: Componentes complexos e autônomos (GameCard, AchievementCard, Formulários).
*   `components/`: Páginas e layouts principais (Timeline, Library, Stats, etc).
*   `context/`: Lógica global de estado, persistência e motor de gamificação.
*   `services/`: Integração com APIs externas (RAWG).

---

## 🌟 Funcionalidades Principais

### 1. Timeline (Linha do Tempo)
A página inicial e coração do app.
*   **Visualização Cronológica:** Eventos organizados por ano, do mais recente para o mais antigo.
*   **Tipos de Eventos:** Início de jogo, Conclusão, Rejogada, Pausa, Desistência e Conquistas (Achievements).
*   **Design:** Layout de linha do tempo infinita com microinterações e destaques visuais para eventos importantes (como platinas).

### 2. Biblioteca
O catálogo completo dos seus jogos.
*   **Filtragem Avançada:** Filtre por Status (Jogando, Zerado, etc), Plataforma e Completude (100%).
*   **Busca Instantânea:** Pesquisa em tempo real pelo título do jogo.
*   **Game Cards:** Cards visuais com a arte da capa, status e plataformas.

### 3. Cadastro de Jogos (`/add`)
Fluxo otimizado para adicionar novos títulos.
*   **Busca Inteligente:**
    *   **Verificação Local:** O sistema avisa se o jogo já está na sua biblioteca para evitar duplicatas.
    *   **API RAWG:** Integração com a API pública da RAWG para buscar capas, gêneros e metadados automaticamente.
    *   **Fallback Manual:** Se a API falhar ou o jogo não for encontrado, permite cadastro manual.
*   **Mapeamento de Plataformas:** O sistema sugere automaticamente as plataformas com base no retorno da API, cruzando com as plataformas que você possui ativas nas configurações.

### 4. Estatísticas (`/stats`)
Visualização de dados do seu hábito de jogo.
*   **Modos de Visão:** Mensal, Anual e Global.
*   **Gráficos:**
    *   KPIs (Key Performance Indicators) para totais.
    *   Gráfico de Pizza para distribuição de status.
    *   Gráfico de Barras para Top Plataformas e Gêneros.

### 5. Gamificação (`/achievements`)
Um sistema interno de conquistas para incentivar o uso do app.
*   **Engine de Conquistas:** Monitora ações no `GameContext` e desbloqueia troféus automaticamente.
*   **Tipos:**
    *   *Booleanas:* Ações únicas (ex: "Cadastrou o primeiro jogo").
    *   *Progressivas:* Metas cumulativas (ex: "Zerou 50 jogos").
    *   *Secretas:* Conquistas ocultas até serem desbloqueadas.
*   **Notificações:** Toasts animados aparecem no canto da tela ao desbloquear uma conquista.

### 6. Configurações (`/settings`)
Personalização da experiência.
*   **Perfil:** Nome e Avatar.
*   **Plataformas Ativas:** Selecione quais consoles/sistemas você possui. Isso filtra as opções na hora de cadastrar jogos, limpando a interface.
*   **API Key:** Campo para inserir sua chave pessoal da RAWG API (opcional, mas recomendado para capas melhores).

---

## 🛠️ Como Funciona o Código

### Gerenciamento de Dados (`GameContext.tsx`)
Não há backend. Todos os dados (`games`, `events`, `achievements`, `userProfile`, `settings`) são geridos por um Contexto React e persistidos automaticamente no `localStorage` do navegador.
*   **Exportação:** O sistema permite exportar um arquivo JSON com todo o seu backup.
*   **Achievement Engine:** Um `useEffect` dentro do contexto recalcula o progresso das conquistas toda vez que a lista de jogos ou eventos muda.

### Integração RAWG (`services/api.ts`)
A função `searchGames` tenta primeiro usar a chave de API fornecida nas configurações. Se a chave não existir ou a requisição falhar (limite de quota, erro de rede), o sistema faz um *fallback* gracioso para um banco de dados mockado, garantindo que a aplicação nunca quebre.

### Design System (`Playground.tsx`)
Existe uma rota `/playground` (acessível pelo menu flutuante) que serve como documentação viva dos componentes. Lá é possível ver todos os botões, inputs, cards e tipografias em seus variados estados.

---

## 🎨 Estilo e UX

*   **Identidade Visual:** Fundo escuro (`slate-900`) com acentos em Índigo, Roxo e Esmeralda.
*   **Fonte:** *Inter* para textos gerais e *Orbitron* para o logotipo, evocando uma estética futurista/gamer.
*   **Layout:** Container centralizado (`max-w-7xl`) para consistência em telas grandes, totalmente responsivo para mobile.
*   **Navegação:** Menu flutuante (FAB) inspirado no "Path", expandindo opções de navegação e ações rápidas.

---

## 📦 Instalação e Execução

Este projeto utiliza uma estrutura simplificada sem bundler complexo exposto (estilo CodeSandbox/StackBlitz), usando import maps para dependências.

1.  Clone o repositório.
2.  Para rodar localmente com um servidor de desenvolvimento (como Vite):
    *   Crie um arquivo `package.json` básico.
    *   Instale `react`, `react-dom`, `react-router-dom`, `lucide-react`, `recharts`, `tailwindcss`.
    *   Execute `npm run dev`.

*Nota: No ambiente atual, o arquivo `index.html` já consome as dependências via CDN (ESM.sh) e Tailwind via script, não necessitando de `npm install` para visualização rápida.*

---

**GameLine v1.0** - Feito para quem ama jogar.
