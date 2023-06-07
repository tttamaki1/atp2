module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :page_session_id

    def connect
      self.page_session_id = verify_user
    end

    protected

    def verify_user
      request.params[:page_session_id]
    end
  end
end