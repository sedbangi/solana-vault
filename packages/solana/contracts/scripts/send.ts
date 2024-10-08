// import * as anchor from "@coral-xyz/anchor";
// import { ComputeBudgetProgram, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, AddressLookupTableProgram, TransactionMessage, VersionedTransaction} from "@solana/web3.js";
// import { OftTools } from "@layerzerolabs/lz-solana-sdk-v2";
// import { Options } from "@layerzerolabs/lz-v2-utilities";
// import { createAndSendV0Tx, getOutboundNoncePda, getSendConfigPda } from "./utils";
// // import { setAnchor, getLzReceiveTypesPda, getOAppConfigPda, getPeerPda, getEventAuthorityPda, getOAppRegistryPda, getSendLibConfigPda, getExecutorConfigPda, getPriceFeedPda, getDvnConfigPda, getEndorcedOptionsPda, getUlnEventAuthorityPda, getUlnSettingPda, getEndpointSettingPda, getDefaultSendLibConfigPda, getSendLibInfoPda, getSendLibPda, getDefaultSendConfigPda, getMessageLibPda, getLookupTableAddress, getLooupTableAccount, extendLookupTable } from "./utils";
// import * as utils from "./utils";
// import { DST_EID, ENDPOINT_PROGRAM_ID, PEER_ADDRESS, LZ_RECEIVE_GAS, LZ_COMPOSE_GAS, LZ_COMPOSE_VALUE, LZ_RECEIVE_VALUE, SEND_LIB_PROGRAM_ID, TREASURY_PROGRAM_ID, EXECUTOR_PROGRAM_ID, PRICE_FEED_PROGRAM_ID, DVN_PROGRAM_ID, LOCAL_RPC, DEV_RPC, MAIN_RPC, DEV_LOOKUP_TABLE_ADDRESS, MAIN_LOOKUP_TABLE_ADDRESS } from "./constants";
// import { BN } from 'bn.js'

// import OAppIdl from "../target/idl/solana_vault.json";
// import { SolanaVault } from "../target/types/solana_vault";
// const OAPP_PROGRAM_ID = new PublicKey(OAppIdl.metadata.address);
// const OAppProgram = anchor.workspace.SolanaVault as anchor.Program<SolanaVault>;

// const [provider, wallet, rpc] = utils.setAnchor();

// const oappConfigPda = utils.getOAppConfigPda(OAPP_PROGRAM_ID);
// console.log("OApp Config PDA:", oappConfigPda.toBase58());

// const lzReceiveTypesPda = utils.getLzReceiveTypesPda(OAPP_PROGRAM_ID, oappConfigPda);
// console.log("LZ Receive Types PDA:", lzReceiveTypesPda.toBase58());

// const peerPda = utils.getPeerPda(OAPP_PROGRAM_ID, oappConfigPda, DST_EID);
// console.log("Peer PDA:", peerPda.toBase58());

// const enforceOptioinsPda = utils.getEndorcedOptionsPda(OAPP_PROGRAM_ID, oappConfigPda, DST_EID);
// console.log("Enforced Options PDA:", enforceOptioinsPda.toBase58());

// const oappRegistryPda = utils.getOAppRegistryPda(oappConfigPda);
// console.log("OApp Registry PDA:", oappRegistryPda.toBase58());

// const eventAuthorityPda = utils.getEventAuthorityPda();
// console.log("Event Authority PDA:", eventAuthorityPda.toBase58());

// const ulnEventAuthorityPda = utils.getUlnEventAuthorityPda();
// console.log("ULN Event Authority PDA:", ulnEventAuthorityPda.toBase58());

// const ulnSettingPda = utils.getUlnSettingPda();
// console.log("ULN Setting PDA:", ulnSettingPda.toBase58());

// const sendLibPda = utils.getSendLibPda();
// console.log("Send Library PDA:", sendLibPda.toBase58());

// const sendLibInfoPda = utils.getSendLibInfoPda(sendLibPda);
// console.log("Send Library Info PDA:", sendLibInfoPda.toBase58());

// const sendLibConfigPda = utils.getSendLibConfigPda(oappConfigPda, DST_EID);
// console.log("Send Library Config PDA:", sendLibConfigPda.toBase58());

// const sendConfigPda = utils.getSendConfigPda(oappConfigPda, DST_EID);
// console.log("Send Config PDA:", sendConfigPda.toBase58());

// const defaultSendConfigPda = utils.getDefaultSendConfigPda(DST_EID);
// console.log("Default Send Config PDA:", defaultSendConfigPda.toBase58());

// const defaultSendLibConfigPda = utils.getDefaultSendLibConfigPda(DST_EID);
// console.log("Default Send Library Config PDA:", defaultSendLibConfigPda.toBase58());

// const executorConfigPda = utils.getExecutorConfigPda();
// console.log("Executor Config PDA: ", executorConfigPda.toString());

// const pricefeedConfigPda = utils.getPriceFeedPda();
// console.log("Price Feed Config PDA: ", pricefeedConfigPda.toString());

// const dvnConfigPda = utils.getDvnConfigPda();
// console.log("DVN Config PDA: ", dvnConfigPda.toString());

// const endpointSettingPda = utils.getEndpointSettingPda();
// console.log("Endpoint Setting PDA: ", endpointSettingPda.toString());

// const outboundNoncePda = getOutboundNoncePda(oappConfigPda, DST_EID, PEER_ADDRESS);
// console.log("Outbound Nonce PDA: ", outboundNoncePda.toString());

// const messageLibPda = utils.getMessageLibPda();
// console.log("Message Lib PDA: ", messageLibPda.toString());

// const tokenMintPubkey = new PublicKey('7m21fAyaHmhq7drNNfx31itkSFTP7FMX38XTYzM7AYFS');
// const amountToSend = BigInt(0);


// async function send() {

    
//     const tableAddresses = [peerPda, enforceOptioinsPda, oappConfigPda, ENDPOINT_PROGRAM_ID, SEND_LIB_PROGRAM_ID, sendLibConfigPda, defaultSendLibConfigPda, sendLibInfoPda, endpointSettingPda, outboundNoncePda, eventAuthorityPda, ulnSettingPda, sendConfigPda, defaultSendConfigPda, TREASURY_PROGRAM_ID, ulnEventAuthorityPda, SEND_LIB_PROGRAM_ID, EXECUTOR_PROGRAM_ID, executorConfigPda, PRICE_FEED_PROGRAM_ID, pricefeedConfigPda, DVN_PROGRAM_ID, dvnConfigPda];
    
    
//     const ixSend = await OAppProgram.methods.oappSend({
//         dstEid: DST_EID,
//         to: Array.from(PEER_ADDRESS),
//         options: Buffer.from(Options.newOptions().addExecutorLzReceiveOption(0,0).toBytes()),
//         message: Buffer.from("Hello, World!"),
//         nativeFee: new BN(1_000_000),
//         lzTokenFee: new BN(0),
//     }).accounts(
//         {
//             peer: peerPda,
//             enforcedOptions: enforceOptioinsPda,
//             oappConfig: oappConfigPda,
//         }
//     ).remainingAccounts(
//         [   
//             // ENDPOINT solana/programs/programs/uln/src/instructions/endpoint/send.rs
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: ENDPOINT_PROGRAM_ID,
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: oappConfigPda,
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: SEND_LIB_PROGRAM_ID
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: sendLibConfigPda, 
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: defaultSendLibConfigPda, 
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: sendLibInfoPda, 
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: endpointSettingPda, 
//             },
//             {
//                 isSigner: false,
//                 isWritable: true,
//                 pubkey: outboundNoncePda, 
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: eventAuthorityPda, 
//             },
//             // ULN solana/programs/programs/uln/src/instructions/endpoint/send.rs
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: ENDPOINT_PROGRAM_ID,
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: ulnSettingPda,
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: sendConfigPda,
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: defaultSendConfigPda,
//             },
//             {
//                 isSigner: true,
//                 isWritable: false,
//                 pubkey: wallet.publicKey,
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: TREASURY_PROGRAM_ID,
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: SystemProgram.programId,
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: ulnEventAuthorityPda, 
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: SEND_LIB_PROGRAM_ID
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: EXECUTOR_PROGRAM_ID
//             },
//             {
//                 isSigner: false,
//                 isWritable: true,
//                 pubkey: executorConfigPda
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: PRICE_FEED_PROGRAM_ID
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: pricefeedConfigPda
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: DVN_PROGRAM_ID
//             },
//             {
//                 isSigner: false,
//                 isWritable: true,
//                 pubkey: dvnConfigPda
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: PRICE_FEED_PROGRAM_ID 
//             },
//             {
//                 isSigner: false,
//                 isWritable: false,
//                 pubkey: pricefeedConfigPda
//             }
//         ]
//     ).instruction();

//     const ixAddComputeBudget = ComputeBudgetProgram.setComputeUnitLimit({ units: 400_000 });

//     await utils.createAndSendV0TxWithTable(
//         [ixSend, ixAddComputeBudget],
//         provider,
//         wallet,
//         tableAddresses
//     );

// }


// async function quoteFee(){
//     // const ixQuoteFee = await OAppProgram.methods.oappQuote({
//     //     dstEid: DST_EID,
//     //     to: Array.from(PEER_ADDRESS),
//     //     options: Buffer.from(Options.newOptions().addExecutorLzReceiveOption(0,0).toBytes()),
//     //     message: Buffer.from("Hello, World!"),
//     //     payInLzToken: false
//     // }).accounts({
//     //     oappConfig: oappConfigPda,
//     //     peer: peerPda,
//     //     enforcedOptions: enforceOptioinsPda,
//     // }).remainingAccounts(
//     //     [   
//     //         // ENDPOINT 
//     //         {
//     //             isSigner: false,
//     //             isWritable: false,
//     //             pubkey: ENDPOINT_PROGRAM_ID,
//     //         },
//     //         {
//     //             isSigner: false,
//     //             isWritable: false,
//     //             pubkey: SEND_LIB_PROGRAM_ID,
//     //         },
//     //         {
//     //             isSigner: false,
//     //             isWritable: false,
//     //             pubkey: sendLibConfigPda,
//     //         },
//     //         {
//     //             isSigner: false,
//     //             isWritable: false,
//     //             pubkey: defaultSendLibConfigPda,
//     //         },
//     //         {
//     //             isSigner: false,
//     //             isWritable: false,
//     //             pubkey: sendLibInfoPda,
//     //         },
//     //         {
//     //             isSigner: false,
//     //             isWritable: false,
//     //             pubkey: endpointSettingPda,
//     //         },
//     //         {
//     //             isSigner: false,
//     //             isWritable: false,
//     //             pubkey: outboundNoncePda,
//     //         },
//     //         // ULN
//     //         {
//     //             isSigner: false,
//     //             isWritable:false,
//     //             pubkey: ENDPOINT_PROGRAM_ID,
//     //         },
//     //         {
//     //             isSigner: false,
//     //             isWritable:false,
//     //             pubkey: ulnSettingPda,
//     //         },
//     //         {
//     //             isSigner: false,
//     //             isWritable:false,
//     //             pubkey: sendConfigPda,
//     //         },
//     //         {
//     //             isSigner: false,
//     //             isWritable:false,
//     //             pubkey: defaultSendConfigPda,
//     //         }
//     //     ]
//     // ).instruction();

//     // const txQuoteFee = new Transaction().add(ixQuoteFee);

//     // const sigQuoteFee = await provider.sendAndConfirm(txQuoteFee, [wallet.payer]);
//     // console.log("Quote Fee transaction confirmed:", sigQuoteFee);

//     // console.log("Quote Fee: ", ixQuoteFee);
// }

// send();