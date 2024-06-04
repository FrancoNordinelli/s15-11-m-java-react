package com.s1511.ticketcine.domain.services;

import com.s1511.ticketcine.application.dto.seat.RequestDtoSeat;
import com.s1511.ticketcine.application.dto.seat.ResponseDtoSeat;
import org.springframework.stereotype.Service;
import com.s1511.ticketcine.domain.entities.Seat;

import java.util.List;
import java.util.Optional;

@Service
public interface SeatService {


    ResponseDtoSeat findSeatById(String id);

    ResponseDtoSeat seatReservation(String userId, String seatId);

    List<Seat> createSeatMatrix(String functionDetailsId);
    Boolean returnSeat(String ticketId, List<String> returnedSeatsIds);
}
