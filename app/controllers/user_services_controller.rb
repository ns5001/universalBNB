class UserServicesController < ApplicationController

  def approve
    @userService = UserService.find_by_id(params[:id])
    @userService.final = true
    @userService.save
    @service = Service.find_by_id(@userService.service_id)
    @service.purchased = true
    @service.save
  end

  def getBought
    respond_to do |format|
      format.json { render json: current_user.getBought }
    end
  end

  def getSold
    respond_to do |format|
      format.json { render json: current_user.getSold }
    end
  end

end
