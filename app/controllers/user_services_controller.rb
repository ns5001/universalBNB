class UserServicesController < ApplicationController

  def approve
    @userService = UserService.find_by_id(params[:id])
    @userService.final = true;
    @userService.save
  end

end
