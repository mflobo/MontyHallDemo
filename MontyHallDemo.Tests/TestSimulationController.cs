using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MontyHallDemo.Controllers;
using MontyHallDemo.Models;

namespace MontyHallDemo.Tests
{
    [TestClass]
    public class TestSimpleProductController
    {
        [TestMethod]
        public void GetSimulations_ShouldReturnProperNumberOfSimulations()
        {
            var controller = new SimulationController();

            var result = controller.get(6, false);
            Assert.AreEqual(result.Count, 6);
        }
    }
}
