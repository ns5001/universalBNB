class ServicesController < ApplicationController

  def show
    binding.pry
    @service = Service.find_by_id(params[:id])
  end

  def index
    respond_to do |format|
      format.json { render json: Service.all}
    end
  end

  def create
    binding.pry
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

  def service_params
    params.require(:service).permit(:service_type, :detail, :name, :price, :user_id)
  end

end
