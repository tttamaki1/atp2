class OpenAiChannel < ApplicationCable::Channel
  @streaming_thread = nil

  def subscribed
    stream_from "open_ai_channel:#{params[:tab_session_id]}"

    # ここにストリーミングを行うコードを追加
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
