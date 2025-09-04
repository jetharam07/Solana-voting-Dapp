// import React, { useState } from "react";
// import * as anchor from "@project-serum/anchor";
// import { Connection, PublicKey } from "@solana/web3.js";
// import idl from "./idl.json";

// // ✅ Tumhara deployed Program ID
// const programID = new PublicKey("Arp1b8XkZ2btv3NmvT5ANMxZ3dzo9dnGK2E28Fq2Mjuj");

// // ✅ RPC (Devnet use karlo, ya Solana Playground RPC agar hai)
// const network = "https://api.devnet.solana.com";

// // ✅ Connection aur Provider
// const connection = new Connection(network, "processed");

// const getProvider = () => {
//   const provider = new anchor.AnchorProvider(
//     connection,
//     window.solana,
//     anchor.AnchorProvider.defaultOptions()
//   );
//   return provider;
// };

// function App() {
//   const [cName, setCName] = useState("");
//   const [partyName, setPartyName] = useState("");
//   const [vName, setVName] = useState("");

//   const connectWallet = async () => {
//     if (window.solana) {
//       try {
//         await window.solana.connect();
//         alert("Wallet connected: " + window.solana.publicKey.toString());
//       } catch (err) {
//         console.error(err);
//       }
//     } else {
//       alert("Phantom Wallet install karo!");
//     }
//   };

//   // ✅ Register Candidate
//   const registerCandidate = async () => {
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
//   };

//   // ✅ Register Voter
//   const registerVoter = async () => {
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
//   };

//   // ✅ Cast Vote
//   const castVote = async () => {
//     const provider = getProvider();
//     const program = new anchor.Program(idl, programID, provider);

//     const [voterPda] = await PublicKey.findProgramAddress(
//       [Buffer.from(vName), provider.wallet.publicKey.toBuffer()],
//       program.programId
//     );

//     const [candidatePda] = await PublicKey.findProgramAddress(
//       [Buffer.from(cName), provider.wallet.publicKey.toBuffer()],
//       program.programId
//     );

//     await program.methods
//       .castVote()
//       .accounts({
//         payer: provider.wallet.publicKey,
//         voter: voterPda,
//         candidate: candidatePda,
//       })
//       .rpc();

//     alert("✅ Vote casted!");
//   };

//   // ✅ Fetch Candidate
//   const fetchCandidate = async () => {
//     const provider = getProvider();
//     const program = new anchor.Program(idl, programID, provider);

//     const [candidatePda] = await PublicKey.findProgramAddress(
//       [Buffer.from(cName), provider.wallet.publicKey.toBuffer()],
//       program.programId
//     );

//     const candidate = await program.account.candidate.fetch(candidatePda);
//     alert(
//       `📌 Candidate: ${candidate.cName}, Party: ${candidate.partyName}, Votes: ${candidate.votes}`
//     );
//   };

//   // ✅ Fetch Voter
//   const fetchVoter = async () => {
//     const provider = getProvider();
//     const program = new anchor.Program(idl, programID, provider);

//     const [voterPda] = await PublicKey.findProgramAddress(
//       [Buffer.from(vName), provider.wallet.publicKey.toBuffer()],
//       program.programId
//     );

//     const voter = await program.account.voter.fetch(voterPda);
//     alert(
//       `📌 Voter: ${voter.vName}, isVoted: ${voter.isVoted ? "Yes" : "No"}`
//     );
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🗳️ Solana Voting DApp</h2>
//       <button onClick={connectWallet}>Connect Wallet</button>

//       <h3>Register Candidate</h3>
//       <input
//         type="text"
//         placeholder="Candidate Name"
//         value={cName}
//         onChange={(e) => setCName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Party Name"
//         value={partyName}
//         onChange={(e) => setPartyName(e.target.value)}
//       />
//       <button onClick={registerCandidate}>Register Candidate</button>

//       <h3>Register Voter</h3>
//       <input
//         type="text"
//         placeholder="Voter Name"
//         value={vName}
//         onChange={(e) => setVName(e.target.value)}
//       />
//       <button onClick={registerVoter}>Register Voter</button>

//       <h3>Cast Vote</h3>
//       <button onClick={castVote}>Cast Vote</button>

//       <h3>Fetch Accounts</h3>
//       <button onClick={fetchCandidate}>Fetch Candidate</button>
//       <button onClick={fetchVoter}>Fetch Voter</button>
//     </div>
//   );
// }

// export default App;








// import React, { useState } from "react";
// import * as anchor from "@project-serum/anchor";
// import { Connection, PublicKey } from "@solana/web3.js";
// import idl from "./idl.json";

// // ✅ Tumhara deployed Program ID
// const programID = new PublicKey("Arp1b8XkZ2btv3NmvT5ANMxZ3dzo9dnGK2E28Fq2Mjuj");

// // ✅ RPC (Devnet)
// const network = "https://api.devnet.solana.com";

// // ✅ Connection aur Provider
// const connection = new Connection(network, "processed");

// const getProvider = () => {
//   const provider = new anchor.AnchorProvider(
//     connection,
//     window.solana,
//     anchor.AnchorProvider.defaultOptions()
//   );
//   return provider;
// };

// function App() {
//   const [cName, setCName] = useState("");
//   const [partyName, setPartyName] = useState("");
//   const [vName, setVName] = useState("");
//   const [candidates, setCandidates] = useState([]);
//   const [voters, setVoters] = useState([]);

//   const connectWallet = async () => {
//     if (window.solana) {
//       try {
//         await window.solana.connect();
//         alert("Wallet connected: " + window.solana.publicKey.toString());
//       } catch (err) {
//         console.error(err);
//       }
//     } else {
//       alert("Phantom Wallet install karo!");
//     }
//   };

//   // ✅ Register Candidate
//   const registerCandidate = async () => {
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
//   };

//   // ✅ Register Voter
//   const registerVoter = async () => {
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
//   };

//   // ✅ Cast Vote
//   const castVote = async () => {
//     const provider = getProvider();
//     const program = new anchor.Program(idl, programID, provider);

//     const [voterPda] = await PublicKey.findProgramAddress(
//       [Buffer.from(vName), provider.wallet.publicKey.toBuffer()],
//       program.programId
//     );

//     const [candidatePda] = await PublicKey.findProgramAddress(
//       [Buffer.from(cName), provider.wallet.publicKey.toBuffer()],
//       program.programId
//     );

//     await program.methods
//       .castVote()
//       .accounts({
//         payer: provider.wallet.publicKey,
//         voter: voterPda,
//         candidate: candidatePda,
//       })
//       .rpc();

//     alert("✅ Vote casted!");
//   };

//   // ✅ Fetch All Candidates
//   const fetchAllCandidates = async () => {
//     const provider = getProvider();
//     const program = new anchor.Program(idl, programID, provider);

//     const candidates = await program.account.candidate.all();
//     setCandidates(candidates);
//   };

//   // ✅ Fetch All Voters
//   const fetchAllVoters = async () => {
//     const provider = getProvider();
//     const program = new anchor.Program(idl, programID, provider);

//     const voters = await program.account.voter.all();
//     setVoters(voters);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🗳️ Solana Voting DApp</h2>
//       <button onClick={connectWallet}>Connect Wallet</button>

//       <h3>Register Candidate</h3>
//       <input
//         type="text"
//         placeholder="Candidate Name"
//         value={cName}
//         onChange={(e) => setCName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Party Name"
//         value={partyName}
//         onChange={(e) => setPartyName(e.target.value)}
//       />
//       <button onClick={registerCandidate}>Register Candidate</button>

//       <h3>Register Voter</h3>
//       <input
//         type="text"
//         placeholder="Voter Name"
//         value={vName}
//         onChange={(e) => setVName(e.target.value)}
//       />
//       <button onClick={registerVoter}>Register Voter</button>

//       <h3>Cast Vote</h3>
//       <button onClick={castVote}>Cast Vote</button>

//       <h3>All Candidates</h3>
//       <button onClick={fetchAllCandidates}>Fetch All Candidates</button>
//       <ul>
//         {candidates.map((c, i) => (
//           <li key={i}>
//             PubKey: {c.publicKey.toBase58()} | Name: {c.account.cName} | Party:{" "}
//             {c.account.partyName} | Votes: {c.account.votes.toString()}
//           </li>
//         ))}
//       </ul>

//       <h3>All Voters</h3>
//       <button onClick={fetchAllVoters}>Fetch All Voters</button>
//       <ul>
//         {voters.map((v, i) => (
//           <li key={i}>
//             PubKey: {v.publicKey.toBase58()} | Name: {v.account.vName} | Voted:{" "}
//             {v.account.isVoted ? "Yes" : "No"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;












// import React, { useState } from "react";
// import * as anchor from "@project-serum/anchor";
// import { Connection, PublicKey } from "@solana/web3.js";
// import idl from "./idl.json";
// // import "./App.css";


// const programID = new PublicKey("Arp1b8XkZ2btv3NmvT5ANMxZ3dzo9dnGK2E28Fq2Mjuj");
// const network = "https://api.devnet.solana.com";
// const connection = new Connection(network, "processed");

// const getProvider = () => {
//   const provider = new anchor.AnchorProvider(
//     connection,
//     window.solana,
//     anchor.AnchorProvider.defaultOptions()
//   );
//   return provider;
// };

// function App() {
//   const [cName, setCName] = useState("");
//   const [partyName, setPartyName] = useState("");
//   const [vName, setVName] = useState("");
//   const [candidates, setCandidates] = useState([]); // ✅ list of candidates

//   const connectWallet = async () => {
//     if (window.solana) {
//       try {
//         await window.solana.connect();
//         alert("Wallet connected: " + window.solana.publicKey.toString());
//       } catch (err) {
//         console.error(err);
//       }
//     } else {
//       alert("Phantom Wallet install karo!");
//     }
//   };

//   // ✅ Register Candidate
//   const registerCandidate = async () => {
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
//   };

//   // ✅ Register Voter
//   const registerVoter = async () => {
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
//   };

//   // ✅ Cast Vote for a given candidate
//   const castVote = async (candidatePubkey) => {
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
//     fetchCandidates(); // refresh list
//   };

//   // ✅ Fetch All Candidates
//   const fetchCandidates = async () => {
//     try {
//       const provider = getProvider();
//       const program = new anchor.Program(idl, programID, provider);

//       const candidateAccounts = await program.account.candidate.all();
//       setCandidates(candidateAccounts);
//     } catch (err) {
//       console.error("Error fetching candidates:", err);
//       alert("❌ Error fetching candidates: " + err.message);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🗳️ Solana Voting DApp</h2>
//       <button onClick={connectWallet}>Connect Wallet</button>

//       <h3>Register Candidate</h3>
//       <input
//         type="text"
//         placeholder="Candidate Name"
//         value={cName}
//         onChange={(e) => setCName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Party Name"
//         value={partyName}
//         onChange={(e) => setPartyName(e.target.value)}
//       />
//       <button onClick={registerCandidate}>Register Candidate</button>

//       <h3>Register Voter</h3>
//       <input
//         type="text"
//         placeholder="Voter Name"
//         value={vName}
//         onChange={(e) => setVName(e.target.value)}
//       />
//       <button onClick={registerVoter}>Register Voter</button>

//       <h3>Fetch All Candidates</h3>
//       <button onClick={fetchCandidates}>Fetch Candidates</button>

//       {/* ✅ Candidate List */}
//       {candidates.length > 0 && (
//         <table border="1" style={{ marginTop: "20px", width: "100%" }}>
//           <thead>
//             <tr>
//               <th>PubKey</th>
//               <th>Name</th>
//               <th>Party</th>
//               <th>Votes</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {candidates.map((c, i) => (
//               <tr key={i}>
//                 <td>{c.publicKey.toBase58()}</td>
//                 <td>{c.account.cName}</td>
//                 <td>{c.account.partyName}</td>
//                 <td>{c.account.votes.toString()}</td>
//                 <td>
//                   <button onClick={() => castVote(c.publicKey.toBase58())}>
//                     Vote
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default App;






// import React, { useState } from "react";
// import * as anchor from "@project-serum/anchor";
// import { Connection, PublicKey } from "@solana/web3.js";
// import idl from "./idl.json";
// import "./App.css";

// const programID = new PublicKey("Arp1b8XkZ2btv3NmvT5ANMxZ3dzo9dnGK2E28Fq2Mjuj");
// const network = "https://api.devnet.solana.com";
// const connection = new Connection(network, "processed");

// const getProvider = () => {
//   const provider = new anchor.AnchorProvider(
//     connection,
//     window.solana,
//     anchor.AnchorProvider.defaultOptions()
//   );
//   return provider;
// };

// function App() {
//   const [cName, setCName] = useState("");
//   const [partyName, setPartyName] = useState("");
//   const [vName, setVName] = useState("");
//   const [candidates, setCandidates] = useState([]);
//   const [voters, setVoters] = useState([]); // ✅ for Only Fetch Users
//   const [walletConnected, setWalletConnected] = useState(false);

//   const connectWallet = async () => {
//     if (window.solana) {
//       try {
//         await window.solana.connect();
//         setWalletConnected(true); // ✅ update state
//         alert("Wallet connected: " + window.solana.publicKey.toString());
//       } catch (err) {
//         console.error(err);
//       }
//     } else {
//       alert("Phantom Wallet install karo!");
//     }
//   };

//   // ✅ Register Candidate
//   const registerCandidate = async () => {
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
//   };

//   // ✅ Register Voter
//   const registerVoter = async () => {
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
//   };

//   // ✅ Cast Vote for a given candidate
//   const castVote = async (candidatePubkey) => {
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
//     fetchCandidates(); // refresh list
//   };

//   // ✅ Fetch All Candidates
//   const fetchCandidates = async () => {
//     try {
//       const provider = getProvider();
//       const program = new anchor.Program(idl, programID, provider);

//       const candidateAccounts = await program.account.candidate.all();
//       setCandidates(candidateAccounts);
//     } catch (err) {
//       console.error("Error fetching candidates:", err);
//       alert("❌ Error fetching candidates: " + err.message);
//     }
//   };

//   // ✅ Fetch Only Users (Voters)
//   const fetchUsers = async () => {
//     try {
//       const provider = getProvider();
//       const program = new anchor.Program(idl, programID, provider);

//       const voterAccounts = await program.account.voter.all();
//       setVoters(voterAccounts);
//     } catch (err) {
//       console.error("Error fetching voters:", err);
//       alert("❌ Error fetching voters: " + err.message);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🗳️ Solana Voting DApp</h2>
//       <button onClick={connectWallet}>
//         {walletConnected ? "Wallet Connected ✅" : "Connect Wallet"}
//       </button>

//       <h3>Register Candidate</h3>
//       <input
//         type="text"
//         placeholder="Candidate Name"
//         value={cName}
//         onChange={(e) => setCName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Party Name"
//         value={partyName}
//         onChange={(e) => setPartyName(e.target.value)}
//       />
//       <button onClick={registerCandidate}>Register Candidate</button>

//       <h3>Register Voter</h3>
//       <input
//         type="text"
//         placeholder="Voter Name"
//         value={vName}
//         onChange={(e) => setVName(e.target.value)}
//       />
//       <button onClick={registerVoter}>Register Voter</button>

//       <h3>Fetch All Candidates</h3>
//       <button onClick={fetchCandidates}>Fetch Candidates</button>

//       <h3>Fetch Only Users</h3>
//       <button onClick={fetchUsers}>Fetch Users</button>

//       {/* ✅ Candidate List */}
//       {candidates.length > 0 && (
//         <table border="1" style={{ marginTop: "20px", width: "100%" }}>
//           <thead>
//             <tr>
//               <th>PubKey</th>
//               <th>Name</th>
//               <th>Party</th>
//               <th>Votes</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {candidates.map((c, i) => (
//               <tr key={i}>
//                 <td>{c.publicKey.toBase58()}</td>
//                 <td>{c.account.cName}</td>
//                 <td>{c.account.partyName}</td>
//                 <td>{c.account.votes.toString()}</td>
//                 <td>
//                   <button onClick={() => castVote(c.publicKey.toBase58())}>
//                     Vote
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* ✅ Voter List */}
//       {voters.length > 0 && (
//         <table border="1" style={{ marginTop: "20px", width: "100%" }}>
//           <thead>
//             <tr>
//               <th>PubKey</th>
//               <th>Voter Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {voters.map((v, i) => (
//               <tr key={i}>
//                 <td>{v.publicKey.toBase58()}</td>
//                 <td>{v.account.vName}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default App;















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

  // ✅ Wallet Connect
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

  // ✅ Register Candidate
  const registerCandidate = async () => {
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

  // ✅ Register Voter
  const registerVoter = async () => {
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

  // ✅ Cast Vote
  const castVote = async (candidatePubkey) => {
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

  // ✅ Fetch Candidates
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

  // ✅ Fetch Voters
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
      <button onClick={connectWallet}>
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
          <button onClick={registerCandidate}>Register Candidate</button>
        </div>

        <div className="card">
          <h3>Register Voter</h3>
          <input
            type="text"
            placeholder="Voter Name"
            value={vName}
            onChange={(e) => setVName(e.target.value)}
          />
          <button onClick={registerVoter}>Register Voter</button>
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
                    <button onClick={() => castVote(c.publicKey.toBase58())}>
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
