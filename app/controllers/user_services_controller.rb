class UserServicesController < ApplicationController

  def approve
    @userService = UserService.find_by_id(params[:id])
    @userService.final = true
    @userService.save
  end

  def reject
    @userService = UserService.find_by_id(params[:id])
    @service = Service.find_by_id(@userService.service_id)
    @service.purchased = false
    @service.save
    @message = Message.new(receiver_id: @userService.buyer_id, user_id: current_user.id, content: current_user.firstName+" "+current_user.lastName+" has declined your request for "+@service.name)
    @message.save
    @userService.destroy
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
