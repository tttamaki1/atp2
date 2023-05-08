import consumer from "./consumer";
import { searchMap } from "../packs/google_maps";

consumer.subscriptions.create("SecondChannel", {
  chunk: '', // ここで this.chunk を初期化
  
  connected() {
    console.log("Connected to SecondChannel");
  },

  disconnected() {
    console.log("Disconnected from SecondChannel");
  },

  async received(data) {
    await new Promise(async resolve => {
      if (data != null) {
        if (data === "<br>") {
          // 文字列が<br>の場合、それまでの文字列をkeywordに入れる
          let keyword = this.chunk;
          keyword = keyword.replace(/^\d+\.\s*/, '');
          console.log(keyword);

          // Call searchMap() with the extracted keyword
          // await searchMap(keyword);
          this.chunk = "";

          // Reset the chunk for the next set of data
          
        } else {
          // データが<br>でない場合、chunkに追加
          this.chunk += data;
        }
      }
    });
  },
});

