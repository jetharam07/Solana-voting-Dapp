# Solana Voting DApp

## Overview

Solana Voting DApp is a decentralized voting application built on the Solana blockchain using Rust and the Anchor Framework. The project allows users to participate in an on-chain election process by registering as either a candidate or a voter through their wallet.

Candidate information, voter records, and vote counts are stored directly on-chain, providing a transparent and verifiable voting system. The application was developed to explore Solana smart contract development, Program Derived Addresses (PDAs), account management, and frontend integration with blockchain programs.

Site Link: https://solana-voting-dapp-tau.vercel.app/
Demo YT Video: https://youtu.be/FWyjmP4SbJA?si=hIMGyCjnyZ9xRjHc

## Features

### Candidate Registration

* Register as a candidate using a connected wallet
* Provide a candidate name and party name
* Store candidate information on-chain
* Track votes received by each candidate

### Voter Registration

* Register as a voter using a connected wallet
* Create a voter account on-chain
* Store voter information securely on the blockchain
* Track voting status for each voter account

### Voting System

* Cast votes through blockchain transactions
* Record votes directly on-chain
* Automatically update candidate vote counts
* Prevent a registered voter account from voting multiple times

### On-Chain Data Access

* View all registered candidates
* View all registered voters
* Display candidate names and party information
* Display vote counts for each candidate
* Fetch election data directly from the blockchain in real time

## How It Works

1. The user connects a Phantom wallet.
2. The user chooses to register as either a candidate or a voter.
3. Candidates submit their name and party information to create a candidate account.
4. Voters submit their name to create a voter account.
5. Registered voters can cast a vote for any registered candidate.
6. The smart contract verifies the voting status of the voter account before processing the vote.
7. Candidate vote totals are updated on-chain.
8. Users can view candidates, voters, and election results directly from the application.

## Technology Stack

### Blockchain 

* Solana
* Rust
* Anchor Framework
* Solana Playground
* Solana Web3.js
* Phantom Wallet

### Frontend 

* React
* JavaScript
* CSS


## Note

This project was created to gain hands-on experience with Solana smart contracts, PDAs, account management, and decentralized voting workflows.


### 🛠 Steps to Clone & Start

```bash
# 1️⃣ Clone the repository
git clone https://github.com/jetharam07/Solana-voting-Dapp.git
cd Solana-voting-Dapp/my-app

# 2️⃣ Check Node.js and npm versions
node -v
npm -v

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the React app
npm start

# open
http://localhost:3000



