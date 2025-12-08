import React from 'react'

export default function image() {
  return (
       <div style={{ textAlign: "center", padding: "20px" }}> {/* Changed body to div */}
          <img
            src="https://via.placeholder.com/150"
            alt="Placeholder Logo" aria-placeholder='This is a component for displaying an image'
            style={{ marginTop: "100px" }}
          />
        </div>
  )
}
