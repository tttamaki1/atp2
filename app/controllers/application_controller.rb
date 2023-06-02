class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?
    before_action :set_locale
    before_action :basic_auth

  

    def switch_language
      I18n.locale = params[:locale]
      redirect_back(fallback_location: root_path)
    end

   private

    def basic_auth
      authenticate_or_request_with_http_basic do |username, password|
        username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]
      end
    end
  
    def set_locale
      session[:locale] = params[:locale] if params[:locale].present?
      I18n.locale = session[:locale] || I18n.default_locale
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
    end

    helper_method :resource_name, :resource, :devise_mapping, :resource_class

    def resource_name
      :user  # or whatever your resource is
    end

    def resource
      @resource ||= User.new  # or whatever your resource is
    end

    def resource_class
      User  # or whatever your resource is
    end

    def devise_mapping
      @devise_mapping ||= Devise.mappings[:user]  # or whatever your resource is
  end
end
