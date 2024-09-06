use anchor_lang::prelude::*;

mod errors;
mod events;
mod instructions;
mod state;

use crate::deposit::DepositParams;
use errors::*;
use instructions::*;
use oapp_send::OAppSendParams;

pub mod msg_codec;

use events::*;
use oapp::endpoint::{MessagingFee, MessagingReceipt};
use state::*;

declare_id!("EFLrsQmcfYTSvVrUiP4qruDhbYBtjbQNAhC6tkLJbBtQ");

pub const OAPP_VERSION: u64 = 1;
pub const OAPP_SDK_VERSION: u64 = 1;

#[program]
pub mod solana_vault {
    use super::*;

    pub fn init_vault(mut ctx: Context<InitVault>) -> Result<()> {
        InitVault::apply(&mut ctx)
    }

    pub fn deposit_entry<'info>(
        mut ctx: Context<'_, '_, '_, 'info, DepositEntry<'info>>,
        deposit_params: DepositParams,
        oapp_params: OAppSendParams,
    ) -> Result<MessagingReceipt> {
        DepositEntry::apply(&mut ctx, deposit_params, oapp_params)
    }

    pub fn init_oapp(mut ctx: Context<InitOApp>, params: InitOAppParams) -> Result<()> {
        InitOApp::apply(&mut ctx, &params)
    }

    pub fn oapp_quote(ctx: Context<OAppQuote>, params: OAppQuoteParams) -> Result<MessagingFee> {
        OAppQuote::apply(&ctx, &params)
    }

    pub fn oapp_send(
        mut ctx: Context<OAppSend>,
        params: OAppSendParams,
    ) -> Result<MessagingReceipt> {
        OAppSend::apply(&mut ctx, &params)
    }

    pub fn lz_receive(mut ctx: Context<OAppLzReceive>, params: OAppLzReceiveParams) -> Result<()> {
        OAppLzReceive::apply(&mut ctx, &params)
    }

    // pub fn vault_deposit(
    //     mut ctx: Context<VaultDeposit>,
    //     params: VaultDepositParams,
    //     oapp_params: OAppSendParams,
    // ) -> Result<MessagingReceipt> {
    //     VaultDeposit::apply(&mut ctx, &params, &oapp_params)
    // }

    pub fn lz_receive_types(
        ctx: Context<OAppLzReceiveTypes>,
        params: OAppLzReceiveParams,
    ) -> Result<Vec<oapp::endpoint_cpi::LzAccount>> {
        OAppLzReceiveTypes::apply(&ctx, &params)
    }

    pub fn set_rate_limit(
        mut ctx: Context<SetRateLimit>,
        params: SetRateLimitParams,
    ) -> Result<()> {
        SetRateLimit::apply(&mut ctx, &params)
    }

    // Set the LayerZero endpoint delegate for OApp admin functions
    pub fn set_delegate(mut ctx: Context<SetDelegate>, params: SetDelegateParams) -> Result<()> {
        SetDelegate::apply(&mut ctx, &params)
    }

    // ============================== Admin ==============================
    pub fn transfer_admin(
        mut ctx: Context<TransferAdmin>,
        params: TransferAdminParams,
    ) -> Result<()> {
        TransferAdmin::apply(&mut ctx, &params)
    }

    pub fn set_peer(mut ctx: Context<SetPeer>, params: SetPeerParams) -> Result<()> {
        SetPeer::apply(&mut ctx, &params)
    }

    pub fn set_enforced_options(
        mut ctx: Context<SetEnforcedOptions>,
        params: SetEnforcedOptionsParams,
    ) -> Result<()> {
        SetEnforcedOptions::apply(&mut ctx, &params)
    }
}
