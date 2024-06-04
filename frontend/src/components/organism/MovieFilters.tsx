"use client"
import { useForm } from "react-hook-form"
import { Container, SxProps, Box } from "@mui/material"
import FilterModal from "../atoms/FilterModal"
import InputSelected, { IOptionsValue } from "../atoms/InputSelected"
import { useEffect, useState } from "react"
import { fetchData } from "@/utils/fetchData"
import { useMoviesState } from "@/store/movies-store"


const styleContainer: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: { xs: "column", sm: "row" },
  gap: "1rem",
  marginBottom: "2.5rem",
  flexWrap: "wrap",
}




const MovieFilters = () => {
  const [citiesList, setCitiesList] = useState<string[] | false>(false)
  const [cinemaList, setCinemaList] = useState<IOptionsValue[] | false>(false)
  // const { setMovies } = useMoviesState(state => ({ setMovies: state.setMovies }))
  const { register, watch } = useForm()
  const { city, cinema } = watch()

  useEffect(() => {
    if (city == "empty" || cinema == "empty" || !cinema) return
    // CAMBIAR UN ESTADO GLOBAL EN EL QUE ESTARÁN LAS PELICULAS SEGÚN EL CINE SELECCIONADO
    const moviesByCinema = async () => {
      const moviesList = await fetchData(`cinema/moviesByCine/${cinema}`, "GET")
      console.log("LISTA DE PELICULAS: " + moviesList);
      console.log("ID DEL CINE: " + cinema);
      
      
    }
    moviesByCinema()
    // setMovies({ city, cinema })
  }, [cinema])

  useEffect(() => {
    const listFetch = async (): Promise<any> => {
      if (!city) {
        // PEDIR LISTA DE CIUDADES
        const res = await fetchData("cinema/cities", "GET");
        if (!res.error) setCitiesList(res)
        return
      }


      if (city !== "empty") {
        //  PEDIR LISTA DE CINES DEPENDIENDO DE LA CIUDAD SELECCIONADA
        const res = await fetchData(`cinema/cinemasByCity/${city}`, "GET")
        const dtoMovies = res.map(({ id, name }: { id: string, name: string }) => ({ value: id, name }))
        setCinemaList(dtoMovies)
        return
      }
    }
    listFetch()
  }, [city])

  return (
    <Container sx={styleContainer}>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem"
        flexDirection={{ xs: "column", sm: "row" }}>

        {citiesList && <InputSelected listTo={"Ciudades"}
          valueAndName={citiesList} register={{ ...register("city") }}
        />}

        {cinemaList && (
          <InputSelected listTo={"Cines"} optionsValue={cinemaList}
            register={{ ...register("cinema") }} />)}

      </Box>
      <FilterModal />
    </Container>
  )
}

export default MovieFilters