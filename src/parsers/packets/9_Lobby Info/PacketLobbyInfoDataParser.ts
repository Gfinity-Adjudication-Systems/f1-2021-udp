import {F1Parser} from '../../F1Parser';
import {LobbyInfoDataParser} from './LobbyInfoDataParser';
import {PacketHeaderParser} from '../PacketHeaderParser';
import {PacketLobbyInfoData} from '../types/types';

export class PacketLobbyInfoDataParser extends F1Parser {
  data: PacketLobbyInfoData;

  constructor(buffer: Buffer, bigintEnabled: boolean) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(bigintEnabled),
      })
      .uint8('m_numPlayers')
      .array('m_lobbyPlayers', {length: 22, type: new LobbyInfoDataParser()});

    this.data = this.fromBuffer(buffer) as PacketLobbyInfoData;
  }
}
