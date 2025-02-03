class GamerTagsController < ApplicationController
  before_action :set_gamer_tag, only: [:show, :update, :destroy]

  def index
    gamer_tags = @current_user.gamer_tags
    render_json({ gamerTags: gamer_tags })
  end

  def show
    render_json({ gamerTag: @gamer_tag })
  end

  def create
    gamer_tag = @current_user.gamer_tags.build(gamer_tag_params)
    if gamer_tag.save
      render_json({ gamerTag: gamer_tag }, status: :created)
    else
      render_error(gamer_tag.errors.full_messages.join(', '))
    end
  end

  def update
    if @gamer_tag.update(gamer_tag_params)
      render_json({ gamerTag: @gamer_tag })
    else
      render_error(@gamer_tag.errors.full_messages.join(', '))
    end
  end

  def destroy
    @gamer_tag.destroy
    head :no_content
  end

  private

  def set_gamer_tag
    @gamer_tag = @current_user.gamer_tags.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_error('Gamer tag not found', :not_found)
  end

  def gamer_tag_params
    params.permit(:tag, :platform)
  end
end 