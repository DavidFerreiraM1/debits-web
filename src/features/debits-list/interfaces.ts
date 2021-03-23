import React from 'react';

export interface BoxTransitionProviderProps {
  children: React.ReactChild;
}

export interface BoxTransitionProps {
  children: React.ReactChild;
}

export interface ListContextProviderProps {
  children: React.ReactChild;
}

export interface ItemListDebitProps {
  id: string;
  username: string;
  debitValue: string;
  openModal(title: string, text: string, onConfirm: () => void): void;
}
