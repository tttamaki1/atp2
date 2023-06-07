class SecondChannel < ApplicationCable::Channel
  $page_session_id = nil
  def subscribed
    $page_session_id = params[:page_session_id]
    stream_from "second_channel:#{$page_session_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
