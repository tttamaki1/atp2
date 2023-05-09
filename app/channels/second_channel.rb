class SecondChannel < ApplicationCable::Channel
  def subscribed
    stream_from "second_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
