import cv2


print("Opening webcam...")

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

if not cap.isOpened():

    print("ERROR: Could not open webcam.")
    exit()


print("Webcam opened successfully.")

while True:

    ret, frame = cap.read()

    if not ret:

        print("ERROR: Could not read frame.")
        break

    cv2.imshow(
        "Camera Test",
        frame
    )

    key = cv2.waitKey(1) & 0xFF

    if key == ord("q"):

        break


cap.release()

cv2.destroyAllWindows()

print("Camera test finished.")