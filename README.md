# Ethereum Transactions Tracker

This project allows you to track Ethereum transactions in real-time and find the address that has the greatest absolute change in balance over the last 100 blocks. It includes a cron-job service that fetches transaction information from etherscan.io's API and saves it in a PostgreSQL database. Additionally, there's an API endpoint that returns the Ethereum address with the biggest balance change.

## Prerequisites

- Node.js (14.x or higher)
- PostgreSQL (9.6 or higher)
- An API key from etherscan.io

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your_github_username/ethereum-transactions-tracker.git
```

2. Go to the project's folder:
```bash
cd ethereum-transactions-tracker
```

3. Install dependencies:
```bash
npm install
```

4. Replace the environment variables in the `.env` file with your configuration:

```
ETHERSCAN_API_KEY=<your_etherscan_api_key>
SERVER_PORT=3000
POSTGRES_DB=transaction
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
```

5. Create the PostgreSQL database and user defined in your `.env` according to the following format:

```bash
createdb transaction
createuser -P -d user
```

6. Apply the database migrations:

```bash
npm run migration:run
```

## Usage

1. Start the project to run the cron-job service and the API endpoint:

```bash
npm start
```

2. To get the Ethereum address with the biggest absolute balance change in the last 100 blocks, send a GET request to the following endpoint:

`GET /api/balance-changes`

For example, using curl:

```bash
curl http://localhost:3000/api/balance-changes
```

It will return a JSON object with the information, e.g.:

```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "balanceChange": "121500000000000000"
}
```

## Contributing

Feel free to submit issues, enhancement requests, or pull requests.
