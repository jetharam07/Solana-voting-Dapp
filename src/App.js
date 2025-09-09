
import React, { useState } from "react";
import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "./idl.json";
import "./App.css";

const programID = new PublicKey("Arp1b8XkZ2btv3NmvT5ANMxZ3dzo9dnGK2E28Fq2Mjuj");
const network = "https://api.devnet.solana.com";
const connection = new Connection(network, "processed");

const getProvider = () => {
  const provider = new anchor.AnchorProvider(
    connection,
    window.solana,
    anchor.AnchorProvider.defaultOptions()
  );
  return provider;
};

function App() {
  const [cName, setCName] = useState("");
  const [partyName, setPartyName] = useState("");
  const [vName, setVName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);

  //  Wallet Connect
  const connectWallet = async () => {
    if (window.solana) {
      try {
        await window.solana.connect();
        setWalletConnected(true);
        alert("Wallet connected: " + window.solana.publicKey.toString());
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Phantom Wallet install karo!");
    }
  };

  //  Register Candidate
  const registerCandidate = async () => {
    if (!walletConnected) {
      alert("❌ Connect your wallet first!");
      return;
    }
    const provider = getProvider();
    const program = new anchor.Program(idl, programID, provider);

    const [candidatePda] = await PublicKey.findProgramAddress(
      [Buffer.from(cName), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .registerCandidate(cName, partyName)
      .accounts({
        payer: provider.wallet.publicKey,
        candidate: candidatePda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    alert("✅ Candidate registered: " + candidatePda.toBase58());
  };

  //  Register Voter
  const registerVoter = async () => {
    if (!walletConnected) {
      alert("❌ Connect your wallet first!");
      return;
    }
    const provider = getProvider();
    const program = new anchor.Program(idl, programID, provider);

    const [voterPda] = await PublicKey.findProgramAddress(
      [Buffer.from(vName), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .registerVoter(vName)
      .accounts({
        payer: provider.wallet.publicKey,
        voter: voterPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    alert("✅ Voter registered: " + voterPda.toBase58());
  };

  //  Cast Vote
  const castVote = async (candidatePubkey) => {
    if (!walletConnected) {
      alert("❌ Connect your wallet first!");
      return;
    }
    const provider = getProvider();
    const program = new anchor.Program(idl, programID, provider);

    const [voterPda] = await PublicKey.findProgramAddress(
      [Buffer.from(vName), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .castVote()
      .accounts({
        payer: provider.wallet.publicKey,
        voter: voterPda,
        candidate: new PublicKey(candidatePubkey),
      })
      .rpc();

    alert("✅ Vote casted for candidate: " + candidatePubkey);
    fetchCandidates();
  };

  //  Fetch Candidates
  const fetchCandidates = async () => {
    try {
      const provider = getProvider();
      const program = new anchor.Program(idl, programID, provider);

      const candidateAccounts = await program.account.candidate.all();
      setCandidates(candidateAccounts);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      alert("❌ Error fetching candidates: " + err.message);
    }
  };

  //  Fetch Voters
  const fetchUsers = async () => {
    try {
      const provider = getProvider();
      const program = new anchor.Program(idl, programID, provider);

      const voterAccounts = await program.account.voter.all();
      setVoters(voterAccounts);
    } catch (err) {
      console.error("Error fetching voters:", err);
      alert("❌ Error fetching voters: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2>🗳️ Solana Voting DApp</h2>
      <button onClick={connectWallet} disabled={walletConnected}>
        {walletConnected ? "Wallet Connected ✅" : "Connect Wallet"}
      </button>

      {/* TOP SECTION */}
      <div className="grid">
        <div className="card">
          <h3>Register Candidate</h3>
          <input
            type="text"
            placeholder="Candidate Name"
            value={cName}
            onChange={(e) => setCName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Party Name"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
          />
          <button onClick={registerCandidate} disabled={!walletConnected}>
            Register Candidate
          </button>
        </div>

        <div className="card">
          <h3>Register Voter</h3>
          <input
            type="text"
            placeholder="Voter Name"
            value={vName}
            onChange={(e) => setVName(e.target.value)}
          />
          <button onClick={registerVoter} disabled={!walletConnected}>
            Register Voter
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION - Candidates */}
      <div className="table-container">
        <h3>Candidate List</h3>
        <button onClick={fetchCandidates}>Fetch Candidates</button>
        {candidates.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>PubKey</th>
                <th>Name</th>
                <th>Party</th>
                <th>Votes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, i) => (
                <tr key={i}>
                  <td data-label="PubKey">{c.publicKey.toBase58()}</td>
                  <td data-label="Name">{c.account.cName}</td>
                  <td data-label="Party">{c.account.partyName}</td>
                  <td data-label="Votes">{c.account.votes.toString()}</td>
                  <td data-label="Action">
                    <button
                      onClick={() => castVote(c.publicKey.toBase58())}
                      disabled={!walletConnected}
                    >
                      Vote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* BOTTOM SECTION - Voters */}
      <div className="table-container">
        <h3>Voter List</h3>
        <button onClick={fetchUsers}>Fetch Users</button>
        {voters.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>PubKey</th>
                <th>Voter Name</th>
              </tr>
            </thead>
            <tbody>
              {voters.map((v, i) => (
                <tr key={i}>
                  <td data-label="PubKey">{v.publicKey.toBase58()}</td>
                  <td data-label="Voter Name">{v.account.vName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
