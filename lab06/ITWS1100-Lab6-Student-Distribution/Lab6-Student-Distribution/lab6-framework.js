/* Lab 6 Framework - Instructional Support Code */
/* ============================================== */
/* This file contains all the advanced framework code that supports */
/* the learning environment. Students should focus on lab6.js only. */
/*                                                                   */
/* INSTRUCTOR NOTE: This file provides:                             */
/* - Progress tracking and validation functions                     */
/* - Console logging and debugging utilities                        */
/* - Modal popups and UI helpers                                    */
/* - Bonus challenge implementations                                 */
/* - All the "advanced" code that might confuse beginning students  */

// Global variables for tracking progress and debugging
let problemsCompleted = 0;
let listItemCounter = 5; // We start with 5 items
let imageIndex = 1;
let imageArray = ['https://images.pexels.com/photos/27799203/pexels-photo-27799203.jpeg?_gl=1*2u8t*_ga*MTM0NzYyMzc2MS4xNzYwOTc4MjY5*_ga_8JE65Q40S6*czE3NjEyMzkyOTkkbzIkZzEkdDE3NjEyMzkzMDEkajU4JGwwJGgw', 'https://images.pexels.com/photos/34090068/pexels-photo-34090068.jpeg?_gl=1*d3n6pz*_ga*MTM0NzYyMzc2MS4xNzYwOTc4MjY5*_ga_8JE65Q40S6*czE3NjEyMzkyOTkkbzIkZzEkdDE3NjEyMzk5NjckajU2JGwwJGgw', 'https://images.pexels.com/photos/31075096/pexels-photo-31075096.jpeg?_gl=1*1yk6k22*_ga*MTM0NzYyMzc2MS4xNzYwOTc4MjY5*_ga_8JE65Q40S6*czE3NjEyMzkyOTkkbzIkZzEkdDE3NjEyNDAwMDgkajE1JGwwJGgw', 'https://images.pexels.com/photos/34203370/pexels-photo-34203370.jpeg?_gl=1*1mj6wjh*_ga*MTM0NzYyMzc2MS4xNzYwOTc4MjY5*_ga_8JE65Q40S6*czE3NjEyMzkyOTkkbzIkZzEkdDE3NjEyNDAwNDAkajU0JGwwJGgw'];
const totalImages = $(imageArray).length;

// Custom console logging function
function logToConsole(message, type = 'info') {
    const consoleContent = $('#consoleContent');
    const timestamp = new Date().toLocaleTimeString();
    const messageClass = `console-${type}`;
    
    consoleContent.append(`
        <div class="console-message ${messageClass}">
            [${timestamp}] ${message}
        </div>
    `);
    
    // Auto-scroll to bottom
    consoleContent.scrollTop(consoleContent[0].scrollHeight);
    
    // Also log to browser console
    console.log(`[Lab6] ${message}`);
}

// Progress tracking function
function markProblemComplete(problemNumber) {
    const progressItem = $(`#progress-${problemNumber}`);
    const progressStatus = progressItem.find('.progress-status');
    
    if (!progressItem.hasClass('completed')) {
        progressItem.addClass('completed');
        progressStatus.text('✅');
        problemsCompleted++;
        
        logToConsole(`Problem ${problemNumber} completed! 🎉`, 'success');
        
        // Check if all main problems are done
        if (problemsCompleted >= 5) {
            showSuccessModal("Congratulations! You've completed all main problems! 🏆");
        }
    }
}

// Success modal function
function showSuccessModal(message) {
    $('#successMessage').text(message);
    $('#successModal').fadeIn();
}

// Framework initialization and utility functions
$(document).ready(function () {
    
    logToConsole("🚀 Lab 6 Enhanced jQuery Learning Environment Loaded!");
    logToConsole("📋 Instructions: Complete each problem section below");
    logToConsole("💡 Tip: Use the 'Check Problem X' buttons to validate your solutions");
    
    // ============================================
    // FRAMEWORK HELPER FUNCTIONS & UTILITY SETUP
    // ============================================
    
    // Help section toggle
    $('#toggleHelp').click(function() {
        $('#helpContent').slideToggle(500);
        const buttonText = $('#helpContent').is(':visible') ? 'Hide Tips & Help' : 'Show Tips & Help';
        $(this).text(buttonText);
    });
    
    // Clear console function
    $('#clearConsole').click(function() {
        $('#consoleContent').empty();
        logToConsole("Console cleared 🧹");
    });
    
    // Modal close functionality
    $('.close, .modal').click(function(e) {
        if (e.target === this) {
            $('.modal').fadeOut();
        }
    });
    
    // Example event handler (provided)
    $('#labButton').click(function () {
        logToConsole('Lab button clicked! This is how event handlers work.', 'info');
        showSuccessModal('Great! You can see how jQuery event handlers work.');
    });

    // ============================================
    // PROBLEM VALIDATION FUNCTIONS
    // ============================================
    
    // Problem 1 Check Function
    $('#bodyBlock').on('click', '.check-work[data-problem="1"]', function() {
        const nameElement = $('.myName');
        const nameText = nameElement.text().trim();
        const fontSize = nameElement.css('font-size');
        const color = nameElement.css('color');
        
        if (nameText !== 'Your Name' && nameText.length > 0) {
            markProblemComplete(1);
            showSuccessModal(`Perfect! You changed the name to "${nameText}" with custom styling!`);
        } else {
            logToConsole('Problem 1 not complete - make sure to change "Your Name" to your actual name', 'error');
        }
    });
    
    // Problem 2 Check Function
    $('#bodyBlock').on('click', '.check-work[data-problem="2"]', function() {
        // This is a basic check - students should test the animations manually
        logToConsole('Problem 2 Check: Test your hide/show/toggle buttons manually!', 'info');
        showSuccessModal('Test your animation buttons! If they work smoothly, you can mark this complete.');
        // Auto-complete for demo purposes
        setTimeout(() => markProblemComplete(2), 1000);
    });
    
    // Problem 3 Check Function
    $('#bodyBlock').on('click', '.check-work[data-problem="3"]', function() {
        logToConsole('Problem 3 Check: Click the list items above to test color toggling!', 'info');
        showSuccessModal('Click the list items! If they turn red and back to normal, you solved it!');
        // Auto-complete for demo purposes
        setTimeout(() => markProblemComplete(3), 1000);
    });
    
    // Problem 4 Check Function
    $('#bodyBlock').on('click', '.check-work[data-problem="4"]', function() {
        const currentItemCount = $('#labList li').length;
        if (currentItemCount > 5) {
            markProblemComplete(4);
            showSuccessModal(`Great! You have ${currentItemCount} list items now!`);
        } else {
            logToConsole('Problem 4 not complete - try clicking "Add List Item" button', 'error');
        }
    });
    
    // Problem 5 Check Function
    $('#bodyBlock').on('click', '.check-work[data-problem="5"]', function() {
        // Check if there are dynamically added items that can turn red
        const totalItems = $('#labList li').length;
        if (totalItems > 5) {
            markProblemComplete(5);
            showSuccessModal('Excellent! You understand event delegation. All list items should now be clickable!');
        } else {
            logToConsole('Problem 5 check: First add some list items, then implement event delegation', 'info');
        }
    });

    // ============================================
    // BONUS CHALLENGES - ADVANCED FEATURES
    // ============================================
    
    // Bonus Challenge A: Form Interaction
    $('#addCustomItem').click(function() {
        const userText = $('#userInput').val().trim();
        if (userText) {
            listItemCounter = $('#labList li').length +1;
            $('#labList').append(`<li>Custom: ${userText} (Item ${listItemCounter})</li>`);
            $('#userInput').val(''); // Clear input
            logToConsole(`Added custom item: "${userText}"`, 'success');
        } else {
            logToConsole('Please enter some text first!', 'error');
        }
    });
    
    $('#clearInput').click(function() {
        $('#userInput').val('');
        logToConsole('Input field cleared', 'info');
    });
    
    // Bonus Challenge B: Image Gallery
    $('#nextImage').click(function() {
        imageIndex ++;
        if (imageIndex == totalImages) {
            imageIndex = 0;
        };
        updateGalleryImage();
    });
    
    $('#prevImage').click(function() {
        imageIndex --;
        if (imageIndex == -1) {
            imageIndex = totalImages
        };
        updateGalleryImage();
    });
    
    function updateGalleryImage() {
        const newSrc = imageArray[imageIndex];
        $('#galleryImage').fadeOut(200, function() {
            $(this).attr('src', newSrc).fadeIn(200);
        });
        logToConsole(`Gallery image changed to: Image ${imageIndex}`, 'info');
    }
    
    // Bonus Challenge C: Accordion Menu
    $(document).on('click', '.accordion-header', function() {
        const content = $(this).next('.accordion-content');
        const isActive = content.hasClass('active');
        
        // Close all accordion items
        $('.accordion-content').removeClass('active').slideUp();
        
        // Open clicked item if it wasn't already active
        if (!isActive) {
            content.addClass('active').slideDown();
        }
        
        logToConsole(`Accordion ${isActive ? 'closed' : 'opened'}: ${$(this).text()}`, 'info');
    });
    
    // ============================================
    // ADDITIONAL HELPER FUNCTIONS
    // ============================================
    
    // Add some encouraging messages
    const encouragementMessages = [
        "Keep going! You're doing great! 🌟",
        "jQuery is powerful once you get the hang of it! 💪",
        "Practice makes perfect! 🎯", 
        "You're building real web development skills! 🚀",
        "Every expert was once a beginner! 📚"
    ];
    
    // Show random encouragement every 2 minutes
    setInterval(function() {
        const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
        logToConsole(randomMessage, 'success');
    }, 120000); // 2 minutes
    
    // Final setup message
    logToConsole("✨ All systems ready! Start with Problem 1 above.", 'success');
    
}); // End of framework $(document).ready()