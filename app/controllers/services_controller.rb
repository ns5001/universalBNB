class ServicesController < ApplicationController

  # Returs the respective Service object using the incoming param containing the ID of the service object
  def show
    @service = Service.find_by_id(params[:id])
  end

  # Returns all Service objects in JSON form
  def index
    respond_to do |format|
      format.json { render json: Service.all}
    end
  end

  # Returns the current user's offered services that have no been purchased yet
  def notYetPurchased
    respond_to do |format|
      format.json { render json: current_user.notYetPurchased }
    end
  end

  # Returns the respective service object foudn by the id in the params
  def edit
    @service = Service.find(params[:id])
  end

  # Creates a Service object using the service params and then redirects to user show page
  def create
    Service.create(service_params)
    redirect_to "/users/show"
  end

  # Finds the respective Service object and updates based upon incoming params and then redirects to user show page
  def update
    @service = Service.find_by(id: params[:id])
    @service.name = params["service"][:name]
    @service.price = params["service"][:price]
    @service.detail = params["service"][:detail]
    @service.save
    redirect_to "/users/show"
  end

  # Returns the current user as on object
  def new
    @user = current_user
  end

  # Finds the respective Service object and deletes it
  def destroy
    service = Service.find_by(id: params[:id])
    service.destroy
  end

  # When a user initially purchases a service, as UserService object is created and assigned to
  # the seller and buyer. Also a message is created and sent to the seller on behalf of the buyer
  # to faciliate communication and decide whether the purchase will be final or not
  def purchase
    if !current_user
      redirect_to "/users/sign_in"
    else
      @service = Service.find(params[:id]);
      @service.purchased = true
      @service.save
      @userService = UserService.new()
      @userService.seller_id = @service.user_id
      @userService.buyer_id = current_user.id
      @userService.service_id = @service.id
      @userService.save
      @message = Message.create()
      @message.user_id = current_user.id
      @message.receiver_id = @service.user_id
      @message.content = "Hi I'd like to purchase " + @service.name + " from you!"
      @message.save
      redirect_to "/"
    end

  end

  # The incoming service params and it's requirement
  def service_params
    params.require(:service).permit(:service_type, :detail, :name, :price, :user_id, :purchased, :id)
  end

end
