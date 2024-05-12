$(function () {
  // Event listener for save button clicks
  $(".saveBtn").on("click", function () {
    var blockId = $(this).parent().attr("id")
    var userInput = $(this).siblings(".description").val().trim();
    localStorage.setItem(blockId, userInput);
  });

  // Function to update time block colors based on current time
  function updateHourBlocks() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Call updateHourBlocks to initially color-code time blocks
  updateHourBlocks();

  // Function to load saved events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedEvent = localStorage.getItem(blockId);
      if (savedEvent !== null) {
        $(this).children(".description").val(savedEvent);
      }
    });
  }

  // Call loadEvents to initially load saved events
  loadEvents();

  // Display current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
});