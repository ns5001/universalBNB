class MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.html { render :show }
      format.json { render json: Message.all }
    end
  end

  def getReceivedMessages
    respond_to do |format|
      format.json { render json: current_user.received_messages }
    end
  end

  def getSentMessages
    respond_to do |format|
      format.html { render :show }
      format.json { render json: current_user.sent_messages }
    end
  end

  def create
    Message.create(message_params)
    redirect_to "/users/inbox"
  end

  def show
    @message = Message.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @message}
    end
  end

  def messageHistory
    @chain = Message.getMessageChain(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @chain.to_json}
    end
  end

  def destroy
    message = Message.find_by(id: params[:id])
    message.destroy
  end

  def createReply
    message = Message.create(user_id: params[:current_user], receiver_id: params[:sender], content: params[:content])
    message.save
    message = Message.find_by(id: params[:message_id])
    message.destroy
  end

  def new
    @user = current_user
  end

  private

  def message_params
    params.require(:message).permit(:receiver, :content, :message_type, :accept, :master_message_id, :connection_id, :user_id)
  end

end
