module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :tab_session_id

    def connect
      self.tab_session_id = verify_user
    end

    protected

    def verify_user
      request.params[:tab_session_id]
    end
  end
end