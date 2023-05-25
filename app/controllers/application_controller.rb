class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?

    private
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
    end

    helper_method :resource_name, :resource, :devise_mapping, :resource_class
    private

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
