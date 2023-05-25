module ApplicationCable
  class Connection < ActionCable::Connection::Base
    def connect
      verify_user
    end

    protected

    def verify_user

      tab_session_id = request.params[:tab_session_id]
      valid_user = tab_session_id.present?
      
      unless valid_user
        reject_unauthorized_connection
      end
    end
  end
end