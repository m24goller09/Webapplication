namespace unit_testing.Tests
{
    public class AssertMessage
    {
        public bool resBool { get; set; }
        private string resString { get; set; }
        private int messageCount;
        public AssertMessage(string s)
        {
            resBool = false;
            resString = s + "\n\t";
            messageCount = 1;
        }

        public void AddErrorMessage(string s)
        {
            resString += messageCount++.ToString() + ". " + s + "\n\t";
        }

        public string GetErrorMessage()
        {
            return resString;
        }
    }
}