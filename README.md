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

### 3. Cadastro e Edição (`/add`, `/finish`, `/drop`)
Fluxos padronizados para gerenciar o ciclo de vida dos jogos.
*   **Busca Inteligente:** Integração com API RAWG e fallback manual.
*   **Botões de Ação Padronizados:** Interface consistente com botões de confirmação proeminentes, largos e centralizados para ações críticas.
*   **Fluxo Flexível:** Permite registrar a conclusão direta de jogos que estavam pausados ou marcados como "Desistiu", sem necessidade de reativação prévia.

### 4. Estatísticas (`/stats`)
Visualização de dados com lógica matemática rigorosa para evitar duplicidade.
*   **Lógica de Distribuição Hierárquica:** Cada jogo conta apenas uma vez no período visualizado, obedecendo a seguinte prioridade de status:
    1.  **Platina (100%):** Prioridade máxima.
    2.  **Finalizado:** Conclusão padrão.
    3.  **Desistência:** Apenas se não houver conclusão no mesmo período.
    4.  **Iniciado:** Apenas se não houver nenhum dos eventos acima (Início, Pausa, Rejogo).
*   **Gráficos:**
    *   KPIs baseados em jogos únicos.
    *   Ranking de Plataformas e Gêneros (contabilizando jogos únicos, não volume de eventos).

### 5. Gamificação (`/achievements`)
Um sistema interno de conquistas para incentivar o uso do app.
*   **Engine de Conquistas:** Monitora ações no `GameContext` e desbloqueia troféus automaticamente.
*   **Tipos:** Booleanas, Progressivas e Secretas.
*   **Notificações:** Toasts animados aparecem no canto da tela ao desbloquear uma conquista.

### 6. Configurações (`/settings`)
Personalização da experiência.
*   **Perfil:** Nome e Avatar.
*   **Plataformas Ativas:** Selecione quais consoles/sistemas você possui para filtrar as listas de cadastro.
*   **API Key:** Campo para inserir sua chave pessoal da RAWG API.

---

## 🛠️ Como Funciona o Código

### Gerenciamento de Dados (`GameContext.tsx`)
Não há backend. Todos os dados (`games`, `events`, `achievements`, `userProfile`, `settings`) são geridos por um Contexto React e persistidos automaticamente no `localStorage`.

### Sistema de Ícones e Cores (`constants.ts` / `platforms.ts`)
A aplicação possui um mapeamento centralizado de plataformas, definindo cores (Tailwind classes) e metadados para cada sistema (PlayStation, Xbox, Nintendo, PC, Mobile, Retro).
