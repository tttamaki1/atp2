import { consumer, pageSessionId } from "./consumer";
import { marking } from '../packs/google_maps';
// console.log('pageSessionId')
// console.log(sessionStorage.getItem('pageSessionId'))
document.addEventListener("turbolinks:load", function() {
  consumer.subscriptions.create(
    {
      channel: 'SecondChannel',
      page_session_id: pageSessionId
    },
    {
    chunk: '', // ここで this.chunk を初期化
    
    connected() {
      console.log("Connected to Channel 2 :"+ pageSessionId);
    },

    disconnected() {
      console.log("Disconnected from Channel 2 :"+ pageSessionId);
    },

    async received(data) {
      await new Promise(async resolve => {
        if (data != null) {
          if (data.includes("<br>")) {
            // 文字列が<br>の場合、それまでの文字列をkeywordに入れる
            let keyword = this.chunk;
            keyword = keyword.replace(/^\d+\.\s*/, '');
            keyword = keyword.replace('&amp;', '&');
            keyword = `${keyword}, ${window.destinationInputValue}`;
            console.log(keyword);
            marking(keyword) //キーワードの取り出しをopen_ai_channelへ移行する

            this.chunk = "";       
          } else {
            // データが<br>でない場合、chunkに追加
            this.chunk += data;
          }
        }
      });
    },
  });
});  

