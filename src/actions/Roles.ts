// GET_ROLE: Fetches data for a specific role based on the role ID
export const GET_ROLE = async (roleId) => {
    try {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching role: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Return role data
    } catch (error) {
      console.error('Error in GET_ROLE:', error);
      throw error; // Propagate error if needed
    }
  };
  
  // POST_ROLE: Creates a new role
  export const POST_ROLE = async (roleData) => {
    try {
      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });
  
      if (!response.ok) {
        throw new Error(`Error creating role: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Return created role data
    } catch (error) {
      console.error('Error in POST_ROLE:', error);
      throw error; // Propagate error if needed
    }
  };
  
  // PUT_ROLE: Updates an existing role
  export const PUT_ROLE = async (roleId, updatedData) => {
    try {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`Error updating role: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Return updated role data
    } catch (error) {
      console.error('Error in PUT_ROLE:', error);
      throw error; // Propagate error if needed
    }
  };
  
  // DEL_ROLE: Deletes a role by ID
  export const DEL_ROLE = async (roleId) => {
    try {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error deleting role: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Return success message or deleted role data
    } catch (error) {
      console.error('Error in DEL_ROLE:', error);
      throw error; // Propagate error if needed
    }
  };
  