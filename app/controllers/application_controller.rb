class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def index
  end

  # For Devise User login
  def after_sign_in_path_for(resource)
      request.env['omniauth.origin'] || stored_location_for(resource) || root_path
  end

end
