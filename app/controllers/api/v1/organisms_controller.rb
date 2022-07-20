class Api::V1::OrganismsController < ApplicationController
  # before_action :set_organism, only: %i[ show edit update destroy ]

  # GET /organisms or /organisms.json
  def index
    @organisms = Organism.all
    render json: @organisms
  end

  # GET /organisms/1 or /organisms/1.json
  def show
    @organism = find_organism
    render json: @organism
  end

  # POST /organisms or /organisms.json
  def create
    @organism = Organism.new(organism_params)

    respond_to do |format|
      if @organism.save
        format.html { redirect_to organism_url(@organism), notice: "Organism was successfully created." }
        format.json { render :show, status: :created, location: @organism }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @organism.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /organisms/1 or /organisms/1.json
  def update
    respond_to do |format|
      if @organism.update(organism_params)
        format.html { redirect_to organism_url(@organism), notice: "Organism was successfully updated." }
        format.json { render :show, status: :ok, location: @organism }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @organism.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /organisms/1 or /organisms/1.json
  def destroy
    @organism.destroy

    respond_to do |format|
      format.html { redirect_to organisms_url, notice: "Organism was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_organism
      Organism.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def organism_params
      params.require(:organism).permit(:name, :species, :user_id)
    end
end
