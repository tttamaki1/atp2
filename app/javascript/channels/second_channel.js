import { consumer, tabSessionId } from "./consumer";
import { marking } from '../packs/google_maps';
// console.log('tabSessionId')
// console.log(sessionStorage.getItem('tabSessionId'))
document.addEventListener("turbolinks:load", function() {
  consumer.subscriptions.create(
    {
      channel: 'SecondChannel',
      tab_session_id: tabSessionId
    },
    {
    chunk: '', // ここで this.chunk を初期化
    
    connected() {
      console.log("Connected to Channel 2 :"+ tabSessionId);
    },

    disconnected() {
      console.log("Disconnected from Channel 2 :"+ tabSessionId);
    },

    async received(data) {
      await new Promise(async resolve => {
        if (data != null) {
          if (data.includes("<br>")) {
            // 文字列が<br>の場合、それまでの文字列をkeywordに入れる
            let keyword = this.chunk;
            keyword = keyword.replace(/^\d+\.\s*/, '');
            keyword = keyword.replace('&amp;', '&');
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

