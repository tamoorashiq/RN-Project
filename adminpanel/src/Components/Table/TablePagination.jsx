import { Button, Grid } from "@mui/material"
import React, { useState, useEffect } from "react"

const TablePagination = ({
  data,
  itemsPerPage = 10,
  next,
  previous,
  count,
  loading,
  setPage,
  loadMore = false
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(data?.length || 0 / itemsPerPage)
  const indexOfLastItem = (currentPage + 1) * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const totalItems = data?.length
  const firstVisibleItem = indexOfFirstItem + 1
  const lastVisibleItem = Math.min(indexOfLastItem, totalItems)

  const handleClick = page => {
    setCurrentPage(page)
  }

  const handlePrevious = () => {
    if (currentPage >= 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }
  useEffect(() => {
    console.log(currentPage, "PAGE")
    setPage(currentPage)
  }, [currentPage])
  const handleNext = () => {
    if (currentPage <= totalPages) {
      setCurrentPage(prevPage => prevPage + 1)
    }
  }

  const renderPagination = () => {
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => handleClick(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </li>
      )
    }

    return loadMore ? (
      <ul className="pagination">
        {next && (
          <Button
            variant="outlined"
            onClick={() =>
              Boolean(next) &&
              next().then(e => {
                handleNext()
              })
            }
            size="small"
            disabled={loading}
            style={{ borderRadius: 20 }}
          >
            Load More
          </Button>
        )}
      </ul>
    ) : (
      <ul className="pagination">
        {currentPage !== 0 && (
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              previous().then(e => {
                handlePrevious()
              })
            }
            disabled={loading}
            style={{ borderRadius: 20 }}
          >
            Previous
          </Button>
        )}
        {next && (
          <Button
            variant="outlined"
            onClick={() =>
              Boolean(next) &&
              next().then(e => {
                handleNext()
              })
            }
            size="small"
            disabled={loading}
            style={{ borderRadius: 20 }}
          >
            Next
          </Button>
        )}
      </ul>
    )
  }

  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ px: 2, p: 2 }}
    >
      <Grid item>
        {firstVisibleItem > count ? count : firstVisibleItem}-{lastVisibleItem}{" "}
        of {count} items
      </Grid>
      <Grid item>{renderPagination()}</Grid>
    </Grid>
  )
}

export default TablePagination
