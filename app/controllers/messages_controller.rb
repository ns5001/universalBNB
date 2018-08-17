class MessagesController < ApplicationController

  # Returns attain all messages in JSON form
  def index
    respond_to do |format|
      format.html { render :show }
      format.json { render json: Message.all }
    end
  end

  # Returns all messages the current user has recieved in JSON format
  def getReceivedMessages
    respond_to do |format|
      format.json { render json: current_user.received_messages }
    end
  end

  # Returns all message the current user has sent in JSON format
  def getSentMessages
    respond_to do |format|
      format.html { render :show }
      format.json { render json: current_user.sent_messages }
    end
  end

  # Creates a message object with the incoming message params
  def create
    Message.create(message_params)
    redirect_to "/users/inbox"
  end

  # Returns the respective message object in JSON form
  def show
    @message = Message.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @message}
    end
  end

  # Deletes the respective message
  def destroy
    message = Message.find_by(id: params[:id])
    message.destroy
  end

  # Creates a new message as a reply with the incoming params and deletes the old message for which the reply
  # is being created for
  def createReply
    message = Message.create(user_id: params[:current_user], receiver_id: params[:sender], content: params[:content])
    message.save
    message = Message.find_by(id: params[:message_id])
    message.destroy
  end

  # returns the current user as an object
  def new
    @user = current_user
  end

  private

  # incoming params must have the receiver_id, content, and user_id
  def message_params
    params.require(:message).permit(:receiver_id, :content, :user_id)
  end

end
