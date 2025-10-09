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

  // Spinner States
  const [loadingCandidate, setLoadingCandidate] = useState(false);
  const [loadingVoter, setLoadingVoter] = useState(false);
  const [loadingFetchCandidates, setLoadingFetchCandidates] = useState(false);
  const [loadingFetchUsers, setLoadingFetchUsers] = useState(false);

  // Updated vote spinner per candidate
  const [loadingVote, setLoadingVote] = useState({}); // object keyed by candidatePubkey

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
      alert("Please install Phantom Wallet!");
    }
  };

  // //  Register Candidate
  // const registerCandidate = async () => {
  //   if (!walletConnected) {
  //     alert("❌ Connect your wallet first!");
  //     return;
  //   }
  //   setLoadingCandidate(true);
  //   try {
  //     const provider = getProvider();
  //     const program = new anchor.Program(idl, programID, provider);

  //     const [candidatePda] = await PublicKey.findProgramAddress(
  //       [Buffer.from(cName), provider.wallet.publicKey.toBuffer()],
  //       program.programId
  //     );

  //     await program.methods
  //       .registerCandidate(cName, partyName)
  //       .accounts({
  //         payer: provider.wallet.publicKey,
  //         candidate: candidatePda,
  //         systemProgram: anchor.web3.SystemProgram.programId,
  //       })
  //       .rpc();

  //     alert("✅ Candidate registered: " + candidatePda.toBase58());
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Error: " + err.message);
  //   } finally {
  //     setLoadingCandidate(false);
  //   }
  // };


  // //  Register Voter
  // const registerVoter = async () => {
  //   if (!walletConnected) {
  //     alert("❌ Connect your wallet first!");
  //     return;
  //   }
  //   setLoadingVoter(true);
  //   try {
  //     const provider = getProvider();
  //     const program = new anchor.Program(idl, programID, provider);

  //     const [voterPda] = await PublicKey.findProgramAddress(
  //       [Buffer.from(vName), provider.wallet.publicKey.toBuffer()],
  //       program.programId
  //     );

  //     await program.methods
  //       .registerVoter(vName)
  //       .accounts({
  //         payer: provider.wallet.publicKey,
  //         voter: voterPda,
  //         systemProgram: anchor.web3.SystemProgram.programId,
  //       })
  //       .rpc();

  //     alert("✅ Voter registered: " + voterPda.toBase58());
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Error: " + err.message);
  //   } finally {
  //     setLoadingVoter(false);
  //   }
  // };

  // //  Cast Vote
  // const castVote = async (candidatePubkey) => {
  //   if (!walletConnected) {
  //     alert("❌ Connect your wallet first!");
  //     return;
  //   }

  //   // Set only this candidate's button loading
  //   setLoadingVote(prev => ({ ...prev, [candidatePubkey]: true }));

  //   try {
  //     const provider = getProvider();
  //     const program = new anchor.Program(idl, programID, provider);

  //     const [voterPda] = await PublicKey.findProgramAddress(
  //       [Buffer.from(vName), provider.wallet.publicKey.toBuffer()],
  //       program.programId
  //     );

  //     await program.methods
  //       .castVote()
  //       .accounts({
  //         payer: provider.wallet.publicKey,
  //         voter: voterPda,
  //         candidate: new PublicKey(candidatePubkey),
  //       })
  //       .rpc();

  //     alert("✅ Vote casted for candidate: " + candidatePubkey);
  //     fetchCandidates();
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Error: " + err.message);
  //   } finally {
  //     // Reset loading for this candidate
  //     setLoadingVote(prev => ({ ...prev, [candidatePubkey]: false }));
  //   }
  // };




// // 🟢 Register Candidate
// const registerCandidate = async () => {
//   if (!walletConnected) {
//     alert("❌ Connect your wallet first!");
//     return;
//   }

//   setLoadingCandidate(true);
//   let candidatePda;

//   try {
//     const provider = getProvider();
//     const program = new anchor.Program(idl, programID, provider);

//     [candidatePda] = await PublicKey.findProgramAddress(
//       [Buffer.from(cName), provider.wallet.publicKey.toBuffer()],
//       program.programId
//     );

//     await program.methods
//       .registerCandidate(cName, partyName)
//       .accounts({
//         payer: provider.wallet.publicKey,
//         candidate: candidatePda,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .rpc();

//     alert("✅ Candidate registered: " + candidatePda.toBase58());
//   } catch (err) {
//     if (candidatePda) {
//       alert("✅ Candidate registered: " + candidatePda.toBase58());
//     } else {
//       alert("❌ Failed to register candidate! PDA not generated.");
//     }
//     console.error("Candidate registration error:", err);
//   } finally {
//     setLoadingCandidate(false);
//   }
// };



// // 🟢 Register Voter
// const registerVoter = async () => {
//   if (!walletConnected) {
//     alert("❌ Connect your wallet first!");
//     return;
//   }

//   setLoadingVoter(true);
//   let voterPda;

//   try {
//     const provider = getProvider();
//     const program = new anchor.Program(idl, programID, provider);

//     [voterPda] = await PublicKey.findProgramAddress(
//       [Buffer.from(vName), provider.wallet.publicKey.toBuffer()],
//       program.programId
//     );

//     await program.methods
//       .registerVoter(vName)
//       .accounts({
//         payer: provider.wallet.publicKey,
//         voter: voterPda,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .rpc();

//     alert("✅ Voter registered: " + voterPda.toBase58());
//   } catch (err) {
//     if (voterPda) {
//       alert("✅ Voter registered: " + voterPda.toBase58());
//     } else {
//       alert("❌ Failed to register voter! PDA not generated.");
//     }
//     console.error("Voter registration error:", err);
//   } finally {
//     setLoadingVoter(false);
//   }
// };



// // 🟢 Cast Vote
// const castVote = async (candidatePubkey) => {
//   if (!walletConnected) {
//     alert("❌ Connect your wallet first!");
//     return;
//   }

//   setLoadingVote(prev => ({ ...prev, [candidatePubkey]: true }));
//   let voterPda;

//   try {
//     const provider = getProvider();
//     const program = new anchor.Program(idl, programID, provider);

//     [voterPda] = await PublicKey.findProgramAddress(
//       [Buffer.from(vName), provider.wallet.publicKey.toBuffer()],
//       program.programId
//     );
// await program.methods
//   .castVote()
//   .accounts({
//     payer: provider.wallet.publicKey,
//     voter: voterPda,
//     candidate: new PublicKey(candidatePubkey),
//   })
//   .rpc();

// // Transaction confirm ho gaya, ab fetch candidates
// await fetchCandidates();  // ✅ ensure latest vote count

// alert("✅ Vote casted for candidate: " + candidatePubkey);

//   } catch (err) {
//     if (voterPda) {
//       alert("✅ Vote casted for candidate: " + candidatePubkey);
//     } else {
//       alert("❌ Failed to cast vote! PDA not generated.");
//     }
//     console.error("Vote error:", err);
//   } finally {
//     setLoadingVote(prev => ({ ...prev, [candidatePubkey]: false }));
//   }
// };













  
//  Register Candidate
const registerCandidate = async () => {
  if (!walletConnected) {
    alert("❌ Connect your wallet first!");
    return;
  }

  setLoadingCandidate(true);
  let candidatePda;

  try {
    const provider = getProvider();
    const program = new anchor.Program(idl, programID, provider);

    [candidatePda] = await PublicKey.findProgramAddress(
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
  } catch (err) {
    if (candidatePda) {
      alert("✅ Candidate registered: " + candidatePda.toBase58());
    } else {
      alert("❌ Failed to register candidate! PDA not generated.");
    }
    console.error("Candidate registration error:", err);
  } finally {
    setLoadingCandidate(false);
  }
};



//  Register Voter
const registerVoter = async () => {
  if (!walletConnected) {
    alert("❌ Connect your wallet first!");
    return;
  }

  setLoadingVoter(true);
  let voterPda;

  try {
    const provider = getProvider();
    const program = new anchor.Program(idl, programID, provider);

    [voterPda] = await PublicKey.findProgramAddress(
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
  } catch (err) {
    if (voterPda) {
      alert("✅ Voter registered: " + voterPda.toBase58());
    } else {
      alert("❌ Failed to register voter! PDA not generated.");
    }
    console.error("Voter registration error:", err);
  } finally {
    setLoadingVoter(false);
  }
};



//  Cast Vote
const castVote = async (candidatePubkey) => {
  if (!walletConnected) {
    alert("❌ Connect your wallet first!");
    return;
  }

  setLoadingVote(prev => ({ ...prev, [candidatePubkey]: true }));
  let voterPda;

  try {
    const provider = getProvider();
    const program = new anchor.Program(idl, programID, provider);

    [voterPda] = await PublicKey.findProgramAddress(
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

// Transaction confirm ho gaya, ab fetch candidates
await fetchCandidates();  // ✅ ensure latest vote count

alert("✅ Vote casted for candidate: " + candidatePubkey);

  } catch (err) {
    if (voterPda) {
      alert("✅ Vote casted for candidate: " + candidatePubkey);
    } else {
      alert("❌ Failed to cast vote! PDA not generated.");
    }
    console.error("Vote error:", err);
  } finally {
    setLoadingVote(prev => ({ ...prev, [candidatePubkey]: false }));
  }
};























  //  Fetch Candidates
  const fetchCandidates = async () => {
    setLoadingFetchCandidates(true);
    try {
      const provider = getProvider();
      const program = new anchor.Program(idl, programID, provider);

      const candidateAccounts = await program.account.candidate.all();
      setCandidates(candidateAccounts);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      alert("❌ Error fetching candidates: " + err.message);
    } finally {
      setLoadingFetchCandidates(false);
    }
  };

  //  Fetch Voters
  const fetchUsers = async () => {
    setLoadingFetchUsers(true);
    try {
      const provider = getProvider();
      const program = new anchor.Program(idl, programID, provider);

      const voterAccounts = await program.account.voter.all();
      setVoters(voterAccounts);
    } catch (err) {
      console.error("Error fetching voters:", err);
      alert("❌ Error fetching voters: " + err.message);
    } finally {
      setLoadingFetchUsers(false);
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
          <button onClick={registerCandidate} disabled={!walletConnected || loadingCandidate}>
            {loadingCandidate ? "⏳ Registering..." : "Register Candidate"}
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
          <button onClick={registerVoter} disabled={!walletConnected || loadingVoter}>
            {loadingVoter ? "⏳ Registering..." : "Register Voter"}
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION - Candidates */}
      <div className="table-container">
        <h3>Candidate List</h3>
        <button onClick={fetchCandidates} disabled={loadingFetchCandidates}>
          {loadingFetchCandidates ? "⏳ Fetching..." : "Fetch Candidates"}
        </button>
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
              {candidates.map((c, i) => {
                const candidateKey = c.publicKey.toBase58();
                return (
                  <tr key={i}>
                    <td data-label="PubKey">{candidateKey}</td>
                    <td data-label="Name">{c.account.cName}</td>
                    <td data-label="Party">{c.account.partyName}</td>
                    <td data-label="Votes">{c.account.votes.toString()}</td>
                    <td data-label="Action">
                      <button
                        onClick={() => castVote(candidateKey)}
                        disabled={!walletConnected || loadingVote[candidateKey]}
                      >
                        {loadingVote[candidateKey] ? "⏳ Voting..." : "Vote"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* BOTTOM SECTION - Voters */}
      <div className="table-container">
        <h3>Voter List</h3>
        <button onClick={fetchUsers} disabled={loadingFetchUsers}>
          {loadingFetchUsers ? "⏳ Fetching..." : "Fetch Users"}
        </button>
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
