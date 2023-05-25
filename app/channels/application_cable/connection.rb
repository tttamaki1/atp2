module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :tab_session_id

    def connect
      self.tab_session_id = request.params[:tab_session_id] || reject_unauthorized_connection
    end
  end
end