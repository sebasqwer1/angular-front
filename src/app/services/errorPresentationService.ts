import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";
import {MessageConstants} from "../constants/message";
@Injectable()
export class ErrorPresentationService {
  private codigosMessage: any;
  private mensajesMessage: any;
  public error: any;
  constructor(private messageService: MessageService) {
    [this.codigosMessage, this.mensajesMessage] = MessageConstants;
  }
  handleError(){
    if(this.error){
      if (this.error instanceof Error && this.error.message !== undefined) {
        const _errorArr = this.error.message.split('||');
        if(_errorArr.length >= 2) {
          this.messageService.add({severity:this.codigosMessage.SEVERROR, detail: _errorArr[1] });
        }else {
          this.messageService.add({severity:this.codigosMessage.SEVERROR, detail: this.mensajesMessage.MSGGENERAL });
        }
      }else {
        this.messageService.add({severity:this.codigosMessage.SEVERROR, detail: this.mensajesMessage.MSGGENERAL  });
      }

    }
  }
  handleErrorMessage(message: any){
    this.messageService.add({severity:this.codigosMessage.SEVERROR, detail: message });
  }
}
