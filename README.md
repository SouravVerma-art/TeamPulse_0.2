# TeamPulse

TeamPulse is a multi-agent AI dashboard that orchestrates a "Morning Brief" by concurrently running specialized agents. It leverages GitHub Models (GPT-4o/mini) to parse meeting transcripts, triage emails, and scan tickets, providing a consolidated view of actions, blockers, and conflicts.

## Project Structure

The repository is divided into two main components:

- **[teampulse-backend](./teampulse-backend)**: A Go-based backend that runs the agent swarm concurrently using goroutines and streams live updates via Server-Sent Events (SSE).
- **[teampulse-dashboard](./teampulse-dashboard)**: A Next.js frontend that provides a real-time dashboard to visualize the agent's progress and the final brief.

## Core Features

- **Concurrent Agent Swarm**: Runs Meeting, Inbox, and Ticket agents in parallel.
- **AI-Powered Orchestration**: Uses GPT-4o to deduplicate tasks and detect cross-agent conflicts.
- **Live Trace Streaming**: Real-time feedback on agent actions via SSE.
- **Modern Dashboard**: Responsive UI built with Tailwind CSS, Framer Motion, and Lucide icons.

## Getting Started

### Prerequisites

- [Go](https://go.dev/) (1.21 or later)
- [Node.js](https://nodejs.org/) (v18 or later)
- [GitHub Token](https://github.com/settings/tokens) (for GitHub Models)

### Quick Start

1.  **Clone the repository**
2.  **Setup the Backend**
    ```bash
    cd teampulse-backend
    # Set your API Key
    export GITHUB_TOKEN=your_token_here
    # Run the server
    go run main.go
    ```
    *See [teampulse-backend/README.md](./teampulse-backend/README.md) for more details.*

3.  **Setup the Frontend**
    ```bash
    cd teampulse-dashboard
    npm install
    npm run dev
    ```
    *See [teampulse-dashboard/README.md](./teampulse-dashboard/README.md) for more details.*

4.  **Open the dashboard**
    Navigate to `http://localhost:5050` to see the application in action.

## Architecture Overview

1.  **Trigger**: User clicks "Run Swarm" on the dashboard.
2.  **Request**: Frontend opens an SSE connection to `/brief/stream`.
3.  **Swarm**: Backend spawns 3 goroutines (Meeting, Inbox, Ticket agents).
4.  **Updates**: As agents work, they send trace events (JSON) through the SSE stream.
5.  **Orchestration**: Once all agents finish, an Orchestrator agent merges results and detects conflicts.
6.  **Delivery**: The final "Morning Brief" JSON is sent, and the connection is closed.

## License

MIT
