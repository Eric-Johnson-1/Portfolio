<div align="center">

<table width="100%"><tr>
<td align="left">eric.johnson.dev123@gmail.com</td>
<td align="center"><h1>Eric Johnson</h1></td>
<td align="right">https://Eric-Johnson-1.github.io/Portfolio</td>
</tr></table>

---

## Summary

</div>

Web3 Full-Stack Software Engineer who has **architected 30+ Solidity smart contracts** and **shipped 4+ production-grade dApps** across DeFi, NFT, DAO governance, and healthcare. Backed by strictly enforced security standards, establishing **100% on-chain core mechanics verification** via comprehensive **Foundry** test suites (**650+ invariant and fuzz tests**). 3+ years of remote Web3 experience spanning **EIP-7201 UUPS-upgradeable contract systems**, **ERC-4337 Account Abstraction** with gasless onboarding, and **ERC-5192 Soulbound Token** architectures, plus 2 years of Web2 full-stack development. Deep expertise in building **censorship-resistant systems** (Merkle proof + IPFS anti-censorship), **on-chain governance** (Governor + Timelock + quadratic funding), and **gas-optimized** storage layouts. Seeking to bring end-to-end blockchain engineering depth to a team building impactful, **user-centric** decentralized infrastructure.

---

<div align="center">

## Technical Skills

</div>

**Blockchain & Smart Contracts:** Solidity, Foundry, OpenZeppelin, UUPS Proxy (EIP-7201 Namespaced Storage), ERC-4337 (Account Abstraction — Smart Account + Paymaster + Factory), ERC-5192 (Soulbound Tokens), ERC-7821 (Batched Execution), ERC-1271 (On-chain Signature Validation), ERC-721A, EIP-712 (Typed Data Signatures), ERC-1155, ERC-20, Create2 Deterministic Deployment, Merkle Proof Verification, Quadratic Funding (CLR), DAO Governance, Gas Optimization, NFT Marketplace Architecture

**Frontend & Wallet Integration:** TypeScript, Next.js (App Router), React, Wagmi, Viem, RainbowKit, ConnectKit, Tailwind CSS, Radix UI, Framer Motion, Zustand, TanStack Query

**Backend & Infrastructure:** Bun, Hono, Node.js, Express.js, Drizzle ORM, PostgreSQL, MongoDB, The Graph (Subgraph), IPFS, Upstash Redis, Docker, Zod (Schema Validation)

**Tools & DevOps:** Turborepo (Monorepo), Git, GitHub Actions (CI/CD), Satori + Sharp (Dynamic SVG → PNG/WebP Rendering)

---

<div align="center">

## Experience

</div>

**Web3 Full-Stack Software Engineer | Remote - Bianjie.AI** <span style="float:right">**2023.02 - present**</span>

_Core developer on a production enterprise-grade IDO (Initial DEX Offering) platform with staking-based allocation, LP yield farming, and on-chain token vesting. Turborepo monorepo across 4 workspaces (web, api, contracts, subgraph) running on Bun._

- Architected 5 UUPS-upgradeable Solidity smart contracts (SalesFactory, Sale, AllocationStaking, FarmingNBL, Vesting) with **EIP-7201** namespaced storage layouts, ReentrancyGuard, and Pausable emergency circuit-breakers — enabling upgrade-safe infrastructure with **zero storage collision risk**.
- Engineered a Create2 deterministic clone deployment system via `Clones.cloneDeterministic`, enabling **predictable Sale contract addresses before deployment** and **gas-efficient factory-pattern** IDO launches.
- Designed a Merkle proof + IPFS anti-censorship whitelist architecture: backend generates Merkle trees, uploads complete whitelist JSON to IPFS, and stores **roots on-chain**. Frontend implements TanStack Query **dual-source fallback** (API → IPFS + on-chain root), ensuring **100% trustless participation** even if the centralized backend goes offline.
- Built a MasterChef V2-style LP farming contract (`FarmingNBL`) with multi-pool support, time-weighted reward accumulation, external `IRewarder` plugin interface, duplicate LP token detection, and **balance-capped safe distribution**.
- Implemented per-user Vesting contract deployment on token claim: Sale contract dynamically deploys individual `Vesting` contracts with configurable linear release schedules, SafeERC20 transfers, and **owner-recoverable `recoverERC20`** for accidentally sent tokens.
- Developed the **Hono + Drizzle ORM backend** (TypeScript/Bun) with RESTful project CRUD, IPFS upload pipeline, Zod schema validation, and PostgreSQL persistence with `onConflictDoUpdate` upsert resolution for atomic snapshot updates.
- Implemented on-chain safety invariant checks: Sale contract verifies `IERC20.balanceOf(address(this)) >= tokensSold + tokensToBuy` (C5), and `withdrawLeftoverTokens` uses **`min(unsold, balance)` safe withdrawal pattern** (H2).
- Deployed a **Graph Protocol subgraph** indexing 4 entity types with `@derivedFrom` reverse-lookup relationships — replacing expensive on-chain enumeration with real-time event-indexed queries.
- Built the **Next.js frontend** with Wagmi / Viem for **type-safe** contract interactions, reactive on-chain state updates, and managed Docker Compose for PostgreSQL and environment-driven chain configuration.

**Web3 Full-Stack Software Engineer | Remote - TheOne.art** <span style="float:right">**2022.02 - 2023.02**</span>

- Engineered a high-performance NFT marketplace supporting primary issuance and secondary trading, leveraging **ERC721A** to achieve **gas-optimized** batch minting operations.
- Architected a decentralized order book using **EIP-712** typed data signatures, enabling gasless off-chain maker order placements with **atomic on-chain taker matching**.
- Developed comprehensive **Subgraph (The Graph)** indexing for complex marketplace events (listings, bids, sales), **reducing** frontend query **latency** by removing on-chain RPC bottlenecks.
- Designed an automated **hybrid storage pipeline** utilizing **IPFS** for decentralized metadata pinning combined with a robust **Node.js/Express.js** backend.
- Implemented diverse wallet standard support with Ethers.js, driving **strict security patterns** including `ReentrancyGuard` and **pull-over-push** fund distribution mechanisms.

---

<div align="center">

## Personal Projects

</div>

**💚 HopeDAO — Decentralized Mutual Aid Crowdfunding DAO** <span style="float:right">**[GitHub](https://github.com/Eric-Johnson-1/HopeDAO)**</span>

A full-stack DAO platform on **Base L2** enabling transparent, community-governed mutual aid crowdfunding with milestone-based fund release and quadratic funding matching.

- Architected 14 Solidity source files across 5 modules: core campaign management, DAO governance, ERC-20 governance token, **ERC-1155 Soulbound** NFTs, and an **ERC-4337 Account Abstraction** system.
- Engineered a full **ERC-4337 smart account stack**: `HopeAccount` (UUPS + **ERC-7821** batched execution + **ERC-1271** off-chain signature validation) + Factory (Create2) + Paymaster (per-user daily limits, exact `postOp` gas refunds).
- Implemented **quadratic funding (CLR matching)** algorithm in a Solidity library using Babylonian-method integer `sqrt` with 1e18 fixed-point precision.
- Designed a **verifier staking & reputation system** (`VerifierRegistry`) with automated cooldowns, governance slash functions, and on-chain reputation scoring.
- Built milestone-based fund release with **IPFS evidence submission**, DAO vote verification, and treasury fee deduction (max 10%).
- Achieved **249 tests passing** (10 suites, including invariant and fuzz tests) with **Foundry**, covering Governor proposals, Paymaster validation, and slashing scenarios.
- **Tech:** Solidity · Foundry · ERC-4337 · Next.js · Wagmi · Viem · Hono · Drizzle ORM · PostgreSQL · Bun

**💉 MedBadge — Blockchain Vaccination Record SBT System** <span style="float:right">**[GitHub](https://github.com/Eric-Johnson-1/MedBadge)**</span>

A decentralized vaccination record management platform turning immunization records into tamper-proof **Soulbound Tokens (ERC-5192)** on **Base L2** with GDPR-compliant privacy architecture.

- Engineered a **storage-slot-optimized** `VaccinationRecord` struct packing 5 fields into 35 bytes / 2 EVM storage slots, achieving **~60% gas savings** versus naïve `uint256` implementations.
- Designed a hybrid on-chain/off-chain architecture with AES-256-GCM encryption for PII on IPFS, fully **GDPR-compliant** via unpin + key destruction for the right to erasure.
- Implemented **ERC-5192 Soulbound semantics** by overriding `_update()` to block transfers, emitting `Locked` events, achieving ERC-721 compatibility without transferability.
- Built a **two-tier institution-based registrar management** system (`Ownable2Step`): Phase 2 delegates to admins with automatic registrar deactivation via cascading `active` flags.
- Engineered batch revocation (up to 200/tx) utilizing `delete revocationReason` to **reclaim storage slots and earn Gas refunds**, maintaining a full on-chain audit trail.
- Built dynamic badge rendering via Satori + Sharp (SVG → PNG/WebP). Integrated **The Graph**, intentionally omitting ERC-721 Enumerable to **save ~20,000 gas per mint**.
- Achieved **119 tests passing** (unit + invariant + fuzz) with **Foundry**.
- **Tech:** Solidity · Foundry · ERC-5192 · ERC-721 · Next.js · Wagmi · Hono · Bun · The Graph · IPFS

---

<div align="center">

## Community & Interests

</div>

- Active contributor in Web3 Discord communities (Foundry, OpenZeppelin, ERC-4337) discussing smart contract security, account abstraction patterns, and L2 scaling architecture.

- Building and open-sourcing full-stack dApps on GitHub, with a focus on gas-optimized Solidity patterns (struct packing, custom errors, storage-reclaim techniques) and modern TypeScript tooling (Bun, Hono, Drizzle ORM).

- Exploring emerging token standards (ERC-5192, ERC-7821) and decentralized governance mechanisms (quadratic funding, milestone-based fund release, verifier staking/slashing).

- Enjoy traveling, cycling, hiking, meditation, and mindfulness.
