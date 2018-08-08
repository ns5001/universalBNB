class ServicesController < ApplicationController

  def show
    @service = Service.find_by_id(params[:id])
  end

  def index
    respond_to do |format|
      format.json { render json: Service.all}
    end
  end

  def create
    Service.create(service_params)
    redirect_to "/users/show"
  end

  def new
    @user = current_user
  end

  def destroy
    service = Service.find_by(id: params[:id])
    service.destroy
  end

  def purchase
    if !current_user
      redirect_to "/users/sign_in"
    else
      @service = Service.find(params[:id]);
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

  def service_params
    params.require(:service).permit(:service_type, :detail, :name, :price, :user_id, :purchased)
  end

end
