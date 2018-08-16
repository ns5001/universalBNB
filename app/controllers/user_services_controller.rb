class UserServicesController < ApplicationController

  # When a seller approves the purchase of a Service
  def approve
    @userService = UserService.find_by_id(params[:id])
    @userService.final = true
    @userService.save
  end

  # When a seller declines the purcahse of a Service. A message is created to the buyer on behalf of the seller
  # in order to inform them of the decline
  def reject
    @userService = UserService.find_by_id(params[:id])
    @service = Service.find_by_id(@userService.service_id)
    @service.purchased = false
    @service.save
    @message = Message.new(receiver_id: @userService.buyer_id, user_id: current_user.id, content: current_user.firstName+" "+current_user.lastName+" has declined your request for "+@service.name)
    @message.save
    @userService.destroy
  end

  # Returns all the current user's bought services in JSON format. Bought meaning the purchase of the Service
  # was approved by the seller
  def getBought
    respond_to do |format|
      format.json { render json: current_user.getBought }
    end
  end

  # Returns all the current user's sold services in JSON format. Sold meaning the purchase of the service
  # was approved by the current user
  def getSold
    respond_to do |format|
      format.json { render json: current_user.getSold }
    end
  end

end
