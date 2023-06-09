class InspirationGuideChannel < ApplicationCable::Channel
    @streaming_thread = nil
  
    def subscribed
      $page_session_id = params[:page_session_id]
      stream_from "inspiration_guide_channel:#{$page_session_id}"
      
      @streaming_thread = Thread.new do
        # ストリーミング処理
      end
    end
  
    def unsubscribed
      # ストリーミング停止の処理を追加
      return unless @streaming_thread
  
      @streaming_thread.terminate
    end
  end
  