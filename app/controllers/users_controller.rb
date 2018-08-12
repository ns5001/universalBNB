class UsersController < ApplicationController

before_action :authenticate_user!

  def index
    respond_to do |format|
      format.json { render json: User.all}
    end
  end

  def show
    @user = current_user
  end

  def getSold
    if current_user
      respond_to do |format|
        format.json {render json: current_user.sold}
       end
    end
  end

  def getBought
    if current_user
      respond_to do |format|
        format.json {render json: current_user.bought}
       end
    end
  end

  def getInProgressBuying
    if current_user
      respond_to do |format|
        format.json {render json: current_user.inProgressBuying}
       end
    end
  end

  def getInProgressSelling
    if current_user
      respond_to do |format|
        format.json {render json: current_user.inProgressSelling}
       end
    end
  end

  def inbox
  end

  private

  def user_params
    params.require(:user).permit(:age, :gender, :age, :firstName, :bio, :username, :lastName)
  end

end
