class SecondChannel < ApplicationCable::Channel
  $tab_session_id = nil
  def subscribed
    $tab_session_id = params[:tab_session_id]
    stream_from "second_channel:#{$tab_session_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
