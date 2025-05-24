class AddRoleToAdmins < ActiveRecord::Migration[8.0]
  def change
    add_column :admins, :role, :string
  end
end
